import 'dotenv/config';
import express from 'express';
const app = express();
const port = 3000;
import dbConnect from './src/config/dbConnect.js';
const conexao = await dbConnect();

conexao.on('error', (error) => {
    console.log('Erro de conexão', error);
});

conexao.once('open', () => {
    console.log('conectado com sucesso !');
})

app.get('/', (req, res, next) => {
    res.status(200).send({ message: "Hello world" })
})

app.listen(port, () => {
    console.log(`escutando na porta: ${port}`)
})