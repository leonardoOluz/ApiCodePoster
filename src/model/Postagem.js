import mongoose from "mongoose";

const postagemSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  id_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    cast: 'Precisa ser um ObjectId',
    ref: "usuarios",
    required: [true, "Campo obrigatório"]
  },
  titulo: { 
    type: String,
    required: [true, "Campo obrigatório"]
  },
  descricao: { 
    type: String,
    required: [true, "Campo obrigatório"]
  },
  linguagem: { 
    type: String,
    required: [true, "Campo obrigatório"]
  },
  codigo: { 
    type: String,
    required: [true, "Campo obrigatório"]
  },
  cor: { 
    type: String,
    required: [true, "Campo obrigatório"]
  },
  curtidas_id_usuario: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuarios"
  }],
  mensagem: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "mensagens"
  }],
}, { versionKey: false });

const postagens = mongoose.model("postagens", postagemSchema);

export {
  postagens,
  postagemSchema
};