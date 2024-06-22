import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  nome: {
    type: String,
    required: [true, `É obrigatorio`]
  },
  apelido: {
    type: String,
    unique: true,
    required: [true, `É obrigatorio`]
  },
  foto: {
    type: String,
    required: [true, `É obrigatorio`]
  },
  email: {
    type: String,
    unique: true,
    required: [true, `É obrigatorio`]
  },
  hash: {
    type: String,
    required: true
  },
  sal: {
    type: String,
    required: true
  },
}, { versionKey: false });

const usuarios = mongoose.model("usuarios", usuarioSchema);

export {
  usuarios,
  usuarioSchema
};