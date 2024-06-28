/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import request from 'supertest';
import {
  afterAll, beforeAll, describe, expect, it,
  test,
} from '@jest/globals';
import app from '../../app.js';
import conexaoMongoose from '../../../mongoose-setup.js';

const { conexaoOn, disconnectionOff } = conexaoMongoose();

let server;
const loginMock = {
  email: 'lucca@email.com',
  senha: 'lucca123',
};

const signUpMock = {
  nome: 'Miles Morales',
  apelido: '@MilesMorales',
  foto: 'MilesMorales',
  email: 'milesmorales@email.com',
  senha: 'miles123',
};

beforeAll(async () => {
  await conexaoOn();
  const port = 3000;
  server = app.listen(port);
});

afterAll(async () => {
  await disconnectionOff();
  server.close();
});

describe('Testes de rotas em Auth', () => {
  test.each([
    ['um email', 'Verifique seu email ou faça um cadastro.', { senha: loginMock.senha }],
    ['senha', 'Campo senha é obrigatório', { email: loginMock.email }],
    ['senha válida', 'Verifique sua senha de acesso !', { email: loginMock.email, senha: '123456' }],
  ])('O login deve possuir %s para autenticar', async (nome, check, send) => {
    await request(server)
      .post('/user/login')
      .send(send)
      .expect(400)
      .expect({
        message: `${check}`,
        status: 400,
      });
  });

  it('Verificar mensagem de necessário token com caminho da rota errada.', async () => {
    const notToken = { message: 'Necessário informar o token' };
    await request(server)
      .post('/user/logi0')// erro de rota sem token caminho da URI
      .send({ email: loginMock.email, senha: '123456' })
      .expect(401)
      .expect(notToken);
  });

  it('Recebendo o token com mensagem de ok', async () => {
    const response = await request(server)
      .post('/user/login')
      .send({ email: loginMock.email, senha: loginMock.senha })
      .expect(200);
    expect(response.body.message).toHaveLength(211);
  });
});

describe('Teste de validação de sign-up', () => {
  const dados = Object.keys(signUpMock);
  test.each([
    ['nome', 'Verifique o campo nome: É obrigatório', 0],
    ['apelido', 'Verifique o campo apelido: É obrigatório', 1],
    ['foto', 'Verifique o campo foto: É obrigatório', 2],
    ['email', 'Verifique o campo email: É obrigatório', 3],
    ['senha', 'Verifique o campo senha', 4],

  ])('teste de validação de %s', async (value, dtn, num) => {
    signUpMock[value] = '';
    signUpMock[dados[num - 1]] = 'testes@paravalidacao.com';
    const response = await request(server)
      .post('/usuario/sign-up')
      .send(signUpMock)
      .expect(400)
      .expect({
        message: `${dtn}`,
        status: 400,
      });
  });
});
