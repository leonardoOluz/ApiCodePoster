/* eslint-disable no-undef */
import express from 'express';
import routes from './routes/index.js';
import dbConnect from './config/dbConnect.js';
import errorValidations from './middlewares/errorValidations.js';

const app = express();

const conexao = await dbConnect();

routes(app);
app.use(errorValidations);

conexao.on('error', (error) => {
  console.log('Erro de conexão', error);
});

conexao.once('open', () => {
  console.log('conectado com banco mongoDB !');
});

export default app;