/* eslint-disable import/extensions */
import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';

const authController = new AuthController();
const router = Router();

router
  .post('/usuario/sign-up', (req, res, next) => authController.signUp(req, res, next))
  .post('/user/login', (req, res, next) => authController.login(req, res, next));

export default router;
