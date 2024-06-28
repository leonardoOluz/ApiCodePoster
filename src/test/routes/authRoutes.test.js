/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import request from 'supertest';
import {
  afterAll, beforeAll, describe, expect, it,
} from '@jest/globals';
import app from '../../app.js';
import conexaoMongoose from '../../../mongoose-setup.js';

const { conexaoOn, disconnectionOff } = conexaoMongoose();

let server;
const msg = [{
  message: 'Verifique seu email ou faça um cadastro.',
  status: 400,
},
{
  message: 'Campo senha é obrigatório',
  status: 400,
}, {
  message: 'Verifique sua senha de acesso !',
  status: 400,
}];

const loginMockOne = {
  email: 'lucca@email.com',
  senha: 'lucca123',
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
  it('O login deve possuir um email para se autenticar', async () => {
    /* O email do usuario é obrigatório */
    await request(server)
      .post('/user/login')
      .send({ senha: loginMockOne.senha })
      .expect(400)
      .expect(msg[0]);
  });

  it('O login deve possuir senha para se autenticar', async () => {
    /* A senha de usuario é obrigatório */
    await request(server)
      .post('/user/login')
      .send({ email: loginMockOne.email })
      .expect(400)
      .expect(msg[1]);
  });

  it('O login deve possuir senha válida para autenticar', async () => {
    /* A senha de usuario é obrigatório */
    await request(server)
      .post('/user/login')
      .send({ email: loginMockOne.email, senha: '123456' })
      .expect(400)
      .expect(msg[2]);
  });

  it('Verificar mensagem de necessário token com caminho da rota errada.', async () => {
    const notToken = { message: 'Necessário informar o token' };
    await request(server)
      .post('/user/logi0')// erro de rota sem token caminho da URI
      .send({ email: loginMockOne.email, senha: '123456' })
      .expect(401)
      .expect(notToken);
  });

  it('Recebendo o token com mensagem de ok', async () => {
    const response = await request(server)
      .post('/user/login')
      .send({ email: loginMockOne.email, senha: loginMockOne.senha })
      .expect(200);
    expect(response.body.message).toHaveLength(211);
  });
});
