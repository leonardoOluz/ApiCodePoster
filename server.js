import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res, next) => {
    res.status(200).send({ message: "Hello world" })
})

app.listen(port, () => {
    console.log(`escutando na porta: ${port}`)
})