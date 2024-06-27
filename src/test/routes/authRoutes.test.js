/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import request from 'supertest';
import {
  afterAll,
  afterEach, beforeAll, beforeEach, describe, it,
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
}];
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
  it('O login deve possuir um email e senha para se autenticar', async () => {
    const loginMockOne = {
      email: 'lucca@email.com',
      senha: 'lucca123',
    };
    /* O email do usuario é obrigatório */
    await request(server)
      .post('/user/login')
      .send({ senha: loginMockOne.senha })
      .expect(400)
      .expect(msg[0]);
    /* A senha de usuario é obrigatório */
    await request(server)
      .post('/user/login')
      .send({ email: loginMockOne.email })
      .expect(400)
      .expect(msg[1]);
  });
});
