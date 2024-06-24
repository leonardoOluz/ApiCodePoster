/* eslint-disable import/extensions */
import express from 'express';
import linguagem from './linguagensRoutes.js';
import usuario from './usuariosRoutes.js';
import postagem from './postagensRoutes.js';
import mensagem from './mensagensRoutes.js';
import auth from './authRoutes.js';
import checkToken from '../middlewares/checkToken.js';
import errorNotFound404 from '../middlewares/errorNotFound404.js';

export default (app) => {
  app.use(
    express.json(),
    auth,
    checkToken,
    usuario,
    linguagem,
    postagem,
    mensagem,
    errorNotFound404,
  );
};
