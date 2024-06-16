import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String },
    apelido: { type: String },
    foto: { type: String },
    email: { type: String },
    hash: { type: String },
    sal: { type: String },
}, { versionKey: false });

const usuarios = mongoose.model("usuarios", usuarioSchema);

export {
    usuarios,
    usuarioSchema
}