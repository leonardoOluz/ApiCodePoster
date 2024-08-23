/* eslint-disable import/extensions */
import { Router } from 'express';
import ImageController from '../controllers/ImageController.js';

const image = new ImageController();
const router = Router();

router
  .get('/image/:id', (req, res, next) => image.getOneDateId(req, res, next))
  .get('/image', (req, res, next) => image.getAllDate(req, res, next))
  .put('/image/:id', (req, res, next) => image.updateDate(req, res, next))
  .delete('/image/:id', (req, res, next) => image.dropDate(req, res, next));

export default router;
