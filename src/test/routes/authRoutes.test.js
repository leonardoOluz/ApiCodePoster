/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import request from 'supertest';
import {
  afterAll, beforeAll, describe, expect, it,
  test,
} from '@jest/globals';
import app from '../../app.js';
import { conexaoOn, disconnectionOff } from '../../../mongoose-setup.js';

let auth = {};
let server;
const loginMock = {
  email: process.env.EMAIL,
  senha: process.env.senha,
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
  await server.close();
});

describe('Teste em rotas de Autenticação', () => {
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
        .post('/user/logi0')// informando rota com erro sem token
        .send({ email: loginMock.email, senha: '123456' })
        .expect(401)
        .expect(notToken);
    });
    it('Recebendo o token com mensagem de ok', async () => {
      const response = await request(server)
        .post('/user/login')
        .send({ email: loginMock.email, senha: loginMock.senha })
        .expect(200);
      auth = await response.body.message;
      expect(response.body.message).toHaveLength(211);
    });
  });
  describe('Teste de validação de sign-up', () => {
    const newUserMock = {
      nome: 'Miles Morales',
      apelido: '@MilesMorales',
      foto: 'MilesMorales',
      email: 'milesmorales@email.com',
      senha: 'miles123',
    };
    const dados = Object.keys(signUpMock);
    test.each([
      ['nome', 'Verifique o campo nome: É obrigatório', 0],
      ['apelido', 'Verifique o campo apelido: É obrigatório', 1],
      ['foto', 'Verifique o campo foto: É obrigatório', 2],
      ['email', 'Verifique o campo email: É obrigatório', 3],
      ['senha', 'Verifique o campo senha: É obrigatório', 4],

    ])('teste de validação de %s', async (value, dtn, num) => {
      signUpMock[value] = '';
      signUpMock[dados[num - 1]] = 'testes@paravalidacao.com';
      await request(server)
        .post('/usuario/sign-up')
        .send(signUpMock)
        .expect(400)
        .expect({
          message: `${dtn}`,
          status: 400,
        });
    });
    it('Teste de Usuario criado com sucesso !', async () => {
      await request(server)
        .post('/usuario/sign-up')
        .send(newUserMock)
        .expect(200)
        .expect({
          message: 'Usuario criado com sucesso !',
        });
    });
    it('Teste de email já está sendo utiizado, escolha outro email', async () => {
      await request(server)
        .post('/usuario/sign-up')
        .send(newUserMock)
        .expect(400)
        .expect({
          message: 'Este email já está sendo utiizado, escolha outro email',
          status: 400,
        });
    });
    it('Teste de apelido já está sendo utiizado, escolha outro apelido !', async () => {
      newUserMock.email = 'testjest@email.com';
      await request(server)
        .post('/usuario/sign-up')
        .send(newUserMock)
        .expect(400)
        .expect({
          message: 'Este apelido já está sendo utiizado, escolha outro apelido',
          status: 400,
        });
    });
    it('Deletar usuario criado por teste', async () => {
      const response = await request(server)
        .get(`/usuarios/busca?nome=${newUserMock.nome}`)
        .set('Authorization', `bearer ${auth}`);
      await request(server)
        .delete(`/usuario/${response.body._id}`)
        .set('Authorization', `bearer ${auth}`)
        .expect(200)
        .expect({ message: `id: ${response.body._id} foi deletado com sucesso` });
    });
  });
});
