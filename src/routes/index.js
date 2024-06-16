import express from "express";
import linguagem from "./linguagensRoutes.js";
import usuario from "./usuariosRoutes.js";

export default app => {
    app.use(
        express.json(),
        usuario,
        linguagem
    )
}