/* eslint-disable import/extensions */
import { Router } from 'express';
import PostagemController from '../controllers/PostagemController.js';

const postagem = new PostagemController();
const router = Router();

router
  .get('/postagem/:id', (req, res, next) => postagem.getOneDateId(req, res, next))
  .get('/postagem/busca', (req, res, next) => postagem.getOneForQuery(req, res, next))
  .get('/postagens/buscar/usuario', (req, res, next) => postagem.getAllForQuery(req, res, next))
  .get('/postagens/result/pesquisa', (req, res, next) => postagem.getAllPosterForTitulo(req, res, next))
  .get('/postagens', (req, res, next) => postagem.getAllDate(req, res, next))
  .post('/postagem', (req, res, next) => postagem.createDate(req, res, next))
  .put('/postagem/:id', (req, res, next) => postagem.updateDate(req, res, next))
  .delete('/postagem/:id', (req, res, next) => postagem.deletePosterMessagens(req, res, next)); // Rota Modificar

export default router;
