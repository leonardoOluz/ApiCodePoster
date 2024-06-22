import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController.js";

const usuario = new UsuarioController();
const router = Router();

router
  .get('/usuarios', (req, res, next) => usuario.getAllDate(req, res, next))
  .get('/usuario/:id', (req, res, next) => usuario.getOneDateId(req, res, next))
  .post('/usuario', (req, res, next) => usuario.createDate(req, res, next))
  .put('/usuario/:id', (req, res, next) => usuario.updateDate(req, res, next))
  .delete('/usuario/:id', (req, res, next) => usuario.dropDate(req, res, next));

export default router;