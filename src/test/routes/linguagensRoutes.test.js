/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import request from 'supertest';
import {
  afterAll, beforeAll, describe, expect, it,
} from '@jest/globals';
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

const linguagemMock = {
  linguagem: 'go',
  texto: 'linguagem go',
};

describe('Testes em Rotas de linguagem', () => {
  describe('Create em linguagem', () => {
    it('Recebendo Token para testes', async () => {
      const response = await request(server)
        .post('/user/login')
        .send({ email: process.env.EMAIL, senha: process.env.SENHA })
        .expect(200);
      auth = await response.body.message;
      expect(response.body.message).toHaveLength(211);
    });
    it('Teste de linguagem criada com sucesso !', async () => {
      /* OK  */
      await request(server)
        .post('/linguagen')
        .send(linguagemMock)
        .set('Authorization', `bearer ${auth}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect({ message: 'dados criado com sucesso!' });
    });
  });
  describe('GET em linguagemRoutes', () => {
    it('retorna uma lista de linguagem como um array de objetos quando chamada com GET ', async () => {
      const res = await request(server)
        .get('/linguagens')
        .auth(auth, { type: 'bearer' })
        .expect(200)
        .expect('Content-Type', /json/);
      if (Array.isArray(res.body)) {
        expect(res.body).toEqual(expect.arrayContaining(
          [{
            _id: expect.any(String),
            linguagem: expect.any(String),
            texto: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }],
        ));
      } else {
        expect(res.body).toBeNull();
      }
    });
    it('acessar linguagem por texto', async () => {
      const response = await request(server)
        .get(`/linguagen/busca/?linguagem=${linguagemMock.linguagem}`)
        .auth(auth, { type: 'bearer' })
        .expect(200)
        .expect('Content-Type', /json/);
      linguagemMock._id = response.body._id;
      expect(response.body).toEqual(expect.objectContaining({
        _id: expect.any(String),
        linguagem: expect.any(String),
        texto: expect.any(String),
      }));
    });
    it('acessar linguagem por id', async () => {
      const response = await request(server)
        .get(`/linguagen/${linguagemMock._id}`)
        .auth(auth, { type: 'bearer' })
        .expect(200)
        .expect('Content-Type', /json/);
      expect(response.body.resultSearched).toEqual(expect.objectContaining({
        _id: expect.any(String),
        linguagem: expect.any(String),
        texto: expect.any(String),
      }));
    });
  });
  describe('PUT em linguagemRoutes', () => {
    it('Atualizando linguagem por id', async () => {
      linguagemMock.linguagem = 'cobol';
      await request(server)
        .put(`/linguagen/${linguagemMock._id}`)
        .send({ linguagem: linguagemMock.linguagem })
        .auth(auth, { type: 'bearer' })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect({ message: `id: ${linguagemMock._id} foi atualizado com sucesso` });
      const response = await request(server)
        .get(`/linguagen/${linguagemMock._id}`)
        .auth(auth, { type: 'bearer' })
        .expect(200)
        .expect('Content-Type', /json/);
      expect(response.body.resultSearched.linguagem).toEqual(linguagemMock.linguagem);
    });
  });
  describe('DELETE em linguagemRoutes', () => {
    it('deletar linguagem por id', async () => {
      await request(server)
        .delete(`/linguagen/${linguagemMock._id}`)
        .auth(auth, { type: 'bearer' })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect({ message: `id: ${linguagemMock._id} foi deletado com sucesso` });
    });
  });
});
