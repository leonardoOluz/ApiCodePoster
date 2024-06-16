import express from 'express';
import routes from './routes/index.js';
import dbConnect from './config/dbConnect.js';

const app = express();

const conexao = await dbConnect();

conexao.on('error', (error) => {
    console.log('Erro de conexão', error);
});

conexao.once('open', () => {
    console.log('conectado com sucesso !');
})


routes(app)

export default app;

