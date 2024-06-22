import { Router } from "express";
import MensagemController from "../controllers/MensagemController.js";

const mensagem = new MensagemController();
const router = Router();

router
  .get('/mensagens', (req, res, next) => mensagem.getAllDate(req, res, next))
  .get('/mensagens/:id', (req, res, next) => mensagem.getOneDateId(req, res, next))
  .post('/mensagem', (req, res, next) => mensagem.checkDateMessageSave(req, res, next))
  .put('/mensagem/:id', (req, res, next) => mensagem.updateDate(req, res, next))
  .delete('/mensagem/:id', (req, res, next) => mensagem.dropDate(req, res, next));

export default router;