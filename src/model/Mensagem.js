import mongoose from "mongoose";

const mensagemSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  id_postagem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "postagens",
    required: [true, "Necessário indicar a postagem"]
  },
  id_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuarios",
    required: [true, "O usuario é obrigatório"]
  },
  texto: { type: String }
}, { versionKey: false });

const mensagens = mongoose.model("mensagens", mensagemSchema);

export {
  mensagens,
  mensagemSchema
};