/* eslint-disable import/extensions */
import { Router } from 'express';
import LinguagemController from '../controllers/LinguagemController.js';

const linguagem = new LinguagemController();
const router = Router();

router
  .get('/linguagens', (req, res, next) => linguagem.getAllDate(req, res, next))
  .get('/linguagen/:id', (req, res, next) => linguagem.getOneDateId(req, res, next))
  .post('/linguagen', (req, res, next) => linguagem.createDate(req, res, next))
  .put('/linguagen/:id', (req, res, next) => linguagem.updateDate(req, res, next))
  .delete('/linguagen/:id', (req, res, next) => linguagem.dropDate(req, res, next));

export default router;
