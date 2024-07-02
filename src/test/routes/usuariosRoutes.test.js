/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import request from 'supertest';
import {
  afterAll, beforeAll, describe, expect, it,
} from '@jest/globals';
import { conexaoOn, disconnectionOff } from '../../../mongoose-setup';
import app from '../../app.js';

let server;
let auth;

beforeAll(async () => {
  await conexaoOn();
  const port = 3000;
  server = app.listen(port);
});

afterAll(async () => {
  await disconnectionOff();
  await server.close();
});

const newUserMock = {
  nome: 'Miles Morales',
  apelido: '@MilesMorales',
  foto: 'MilesMorales',
  email: 'milesmorales@email.com',
  senha: 'miles123',
};

describe.skip('Testes em Rotas de Usuario', () => {
  describe('Create usuario utilizando sign-up', () => {
    it('Teste de Usuario criado com sucesso !', async () => {
      const response = await request(server)
        .post('/usuario/sign-up')
        .send(newUserMock)
        .expect(200) // Aceita a resposta OK (status 200)
        .expect('Content-Type', /json/)
        .expect({
          message: 'Usuario criado com sucesso !',
        });
    });
    it('Recebendo Token para testes', async () => {
      const response = await request(server)
        .post('/user/login')
        .send({ email: newUserMock.email, senha: newUserMock.senha })
        .expect(200);
      auth = await response.body.message;
      expect(response.body.message).toHaveLength(205);
    });
  });
  describe('GET em UsuarioRoutes', () => {
    it('retorna uma lista de usuários como um array de objetos quando chamada com GET /users', async () => {
      const res = await request(server)
        .get('/usuarios')
        .auth(auth, { type: 'bearer' })
        .expect(200) // Aceita a resposta OK (status 200)
        .expect('Content-Type', /json/);
      if (Array.isArray(res.body)) {
        expect(res.body).toEqual(expect.arrayContaining(
          [{
            _id: expect.any(String),
            apelido: expect.any(String),
            email: expect.any(String),
            foto: expect.any(String),
            nome: expect.any(String),
          }],
        )); // Verifica se o array contém objetos com as propriedades esperadas;
      } else {
        expect(res.body).toBeNull();
      }
    });
    it('acessar usuario por nome', async () => {
      const response = await request(server)
        .get(`/usuarios/busca?nome=${newUserMock.nome}`)
        .set('Authorization', `bearer ${auth}`)
        .expect(200) // Aceita a resposta OK (status 200)
        .expect('Content-Type', /json/);
      newUserMock._id = response.body._id;
      expect(response.body).toEqual(expect.objectContaining({
        _id: expect.any(String),
        apelido: expect.any(String),
        email: expect.any(String),
        foto: expect.any(String),
        nome: expect.any(String),
      }));
    });
  });
  describe('PUT em UsuarioRoutes', () => {
    it('Atualizando usuario por id', async () => {
      const response = await request(server)
        .put(`/usuario/${newUserMock._id}`)
        .send({ apelido: 'Homem Aranha' })
        .auth(auth, { type: 'bearer' })
        .expect(200) // Aceita a resposta OK (status 200)
        .expect('Content-Type', /json/)
        .expect({ message: `id: ${newUserMock._id} foi atualizado com sucesso` });
    });
  });
  describe('DELETE em UsuarioRoutes', () => {
    it('deletar usuario por id', async () => {
      const response = await request(server)
        .delete(`/usuario/${newUserMock._id}`)
        .auth(auth, { type: 'bearer' })
        .expect(200) // Aceita a resposta OK (status 200)
        .expect('Content-Type', /json/)
        .expect({ message: `id: ${newUserMock._id} foi deletado com sucesso` });
    });
  });
});
