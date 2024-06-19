import express from "express";
import linguagem from "./linguagensRoutes.js";
import usuario from "./usuariosRoutes.js";
import postagem from "./postagensRoutes.js";
import mensagem from "./mensagensRoutes.js";

export default app => {
    app.use(
        express.json(),
        usuario,
        linguagem,
        postagem,
        mensagem
    )
}