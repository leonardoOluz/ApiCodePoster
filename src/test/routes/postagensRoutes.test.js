/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import request from 'supertest';
import {
  afterAll, beforeAll, describe, expect, it,
} from '@jest/globals';
import { isValidObjectId } from 'mongoose';
import { conexaoOn, disconnectionOff } from '../../../mongoose-setup.js';
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

const postagemMock = {
  id_usuario: '667354473deeb5146cb21655',
  titulo: 'Testando rotas de postagem',
  descricao: 'Esse é um teste de rotas de postagem',
  linguagem: 'php',
  codigo: '?php/> function app(a, b){ return a + b <php>',
  cor: '#f2f2f2',
};

describe('Testes em Rotas de Postagem', () => {
  describe('Create Postagem utilizando sign-up', () => {
    it('Recebendo Token para testes', async () => {
      const response = await request(server)
        .post('/user/login')
        .send({ email: process.env.EMAIL, senha: process.env.SENHA })
        .expect(200);
      auth = await response.body.message;
      expect(response.body.message).toHaveLength(211);
    });
    it('Teste de postagem criada com sucesso !', async () => {
      const response = await request(server)
        .post('/postagem')
        .send(postagemMock)
        .set('Authorization', `bearer ${auth}`)
        .expect(200) // Aceita a resposta OK (status 200)
        .expect('Content-Type', /json/)
        .expect({ mesage: 'dados criado com sucesso!' });
    });
  });
  describe('GET em PostagemRoutes', () => {
    it('retorna uma lista de usuários como um array de objetos quando chamada com GET /users', async () => {
      const res = await request(server)
        .get('/postagens')
        .auth(auth, { type: 'bearer' })
        .expect(200) // Aceita a resposta OK (status 200)
        .expect('Content-Type', /json/);
      if (Array.isArray(res.body)) {
        expect(res.body).toEqual(expect.arrayContaining(
          [{
            /* Colocar o objeto de verificação */
            _id: expect.any(String),
            id_usuario: expect.any(String),
            titulo: expect.any(String),
            descricao: expect.any(String),
            linguagem: expect.any(String),
            codigo: expect.any(String),
            cor: expect.any(String),
            curtidas_id_usuario: expect.any(Array),
            mensagem: expect.any(Array),
          }],
        )); // Verifica se o array contém objetos com as propriedades esperadas;
      } else {
        expect(res.body).toBeNull();
      }
    });
    it('acessar Postagem por titulo', async () => {
      const response = await request(server)
        .get(`/postagem/busca?titulo=${postagemMock.titulo}`)
        .set('Authorization', `bearer ${auth}`)
        .expect(200) // Aceita a resposta OK (status 200)
        .expect('Content-Type', /json/);
      postagemMock._id = response.body._id;
      expect(response.body).toEqual(expect.objectContaining({
        /* Colocar o objeto de retorno */
        _id: expect.any(String),
        titulo: expect.any(String),
        descricao: expect.any(String),
        linguagem: expect.any(String),
        codigo: expect.any(String),
        cor: expect.any(String),
        curtidas_id_usuario: expect.any(Array),
        mensagem: expect.any(Array),
      }));
    });
  });
  describe.skip('PUT em PostagemRoutes', () => {
    it('Atualizando Postagem por id', async () => {
      const response = await request(server)
        .put(`/postagem/${postagemMock._id}`)
        .send({ /* colocar a mudança */ })
        .auth(auth, { type: 'bearer' })
        .expect(200) // Aceita a resposta OK (status 200)
        .expect('Content-Type', /json/)
        .expect({ message: `id: ${postagemMock._id} foi atualizado com sucesso` });
    });
  });
  describe.skip('DELETE em PostagemRoutes', () => {
    it('deletar Postagem por id', async () => {
      const response = await request(server)
        .delete(`/postagem/${postagemMock._id}`)
        .auth(auth, { type: 'bearer' })
        .expect(200) // Aceita a resposta OK (status 200)
        .expect('Content-Type', /json/)
        .expect({ message: `id: ${postagemMock._id} foi deletado com sucesso` });
    });
  });
});
