/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import express from 'express';
import routes from './routes/index.js';
import dbConnect from './config/dbConnect.js';
import errorValidations from './middlewares/errorValidations.js';

const app = express();

const conexao = await dbConnect();

routes(app);
app.use(errorValidations);

conexao.on('error', async (error) => {
  /* erro de conexão */
  console.error('Erro de conexão', await error);
});

conexao.once('open', async () => {
  /* Conexão com banco de dados ok */
  console.warn('conectado com banco mongoDB !');
});

export default app;
