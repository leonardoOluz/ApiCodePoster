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

const mensagemMock = {
  id_postagem: '667882e594eb54db12f6a23d',
  id_usuario: '667354473deeb5146cb21655',
  texto: 'Essa é uma mensagem do JEST',
};

describe('Testes em Rotas de mensagem', () => {
  describe('Create em mensagem', () => {
    it('Recebendo Token para testes', async () => {
      const response = await request(server)
        .post('/user/login')
        .send({ email: process.env.EMAIL, senha: process.env.SENHA })
        .expect(200);
      auth = await response.body.message;
      expect(response.body.message).toHaveLength(211);
    });
    it('Teste de mensagem criada com sucesso !', async () => {
      await request(server)
        .post('/mensagem')
        .send(mensagemMock)
        .set('Authorization', `bearer ${auth}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect({ message: 'Mensagem salva com sucesso' });
    });
  });
  describe('GET em mensagemRoutes', () => {
    it('retorna uma lista de mensagem como um array de objetos quando chamada com GET ', async () => {
      const res = await request(server)
        .get('/mensagens')
        .auth(auth, { type: 'bearer' })
        .expect(200)
        .expect('Content-Type', /json/);
      if (Array.isArray(res.body)) {
        expect(res.body).toEqual(expect.arrayContaining(
          [{
            _id: expect.any(String),
            id_postagem: expect.any(String),
            id_usuario: expect.any(String),
            texto: expect.any(String),
          }],
        ));
      } else {
        expect(res.body).toBeNull();
      }
    });
    it('acessar mensagem por texto', async () => {
      const response = await request(server)
        .get(`/mensagens/busca/?texto=${mensagemMock.texto}`)
        .auth(auth, { type: 'bearer' })
        .expect(200)
        .expect('Content-Type', /json/);
      mensagemMock._id = response.body._id;
      expect(response.body).toEqual(expect.objectContaining({
        _id: expect.any(String),
        texto: expect.any(String),
      }));
    });
    it('acessar mensagem por id', async () => {
      const response = await request(server)
        .get(`/mensagens/${mensagemMock._id}`)
        .auth(auth, { type: 'bearer' })
        .expect(200)
        .expect('Content-Type', /json/);
      expect(response.body.resultSearched).toEqual(expect.objectContaining({
        _id: expect.any(String),
        id_postagem: expect.any(String),
        id_usuario: expect.any(String),
        texto: expect.any(String),
      }));
    });
  });
  describe('PUT em mensagemRoutes', () => {
    it('Atualizando mensagem por id', async () => {
      mensagemMock.texto = 'Um novo texto para teste';
      await request(server)
        .put(`/mensagem/${mensagemMock._id}`)
        .send({ texto: mensagemMock.texto })
        .auth(auth, { type: 'bearer' })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect({ message: `id: ${mensagemMock._id} foi atualizado com sucesso` });
      const response = await request(server)
        .get(`/mensagens/${mensagemMock._id}`)
        .auth(auth, { type: 'bearer' })
        .expect(200)
        .expect('Content-Type', /json/);
      expect(response.body.resultSearched.texto).toEqual(mensagemMock.texto);
    });
  });
  describe('DELETE em mensagemRoutes', () => {
    it('deletar mensagem por id', async () => {
      await request(server)
        .delete(`/mensagem/${mensagemMock._id}`)
        .auth(auth, { type: 'bearer' })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect({ message: `id: ${mensagemMock._id} foi deletado com sucesso` });
    });
  });
});
