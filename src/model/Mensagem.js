import mongoose from "mongoose";

const mensagemSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  id_postagem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "postagens",
    required: [true, "É obrigatório"]
  },
  id_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuarios",
    required: [true, "É obrigatório"]
  },
  texto: { 
    type: String,
    required: [true, "É obrigatório"]
  }
}, { versionKey: false });

const mensagens = mongoose.model("mensagens", mensagemSchema);

export {
  mensagens,
  mensagemSchema
};