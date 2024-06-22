import mongoose, { MongooseError } from "mongoose";
import ErroValidation from "../errors/ErrorValidation.js";

const postagemSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  id_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuarios",
    required: [true, "Campo obrigatório"],
    validate(value){
      /* Verificar a mensagem passada para a validação  */
      if(value == '') throw new ErroValidation(MongooseError('Campo em branco'));
    }
  },
  titulo: { type: String },
  descricao: { type: String },
  linguagem: { type: String },
  codigo: { type: String },
  cor: { type: String },
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