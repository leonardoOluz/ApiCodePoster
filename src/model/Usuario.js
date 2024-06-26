import mongoose from 'mongoose';

const usuarioSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  nome: {
    type: String,
    required: [true, 'É obrigatório'],
  },
  apelido: {
    type: String,
    unique: true,
    required: [true, 'É obrigatório'],
  },
  foto: {
    type: String,
    required: [true, 'É obrigatório'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'É obrigatório'],
  },
  hash: {
    type: String,
    required: true,
  },
  sal: {
    type: String,
    required: true,
  },
  createdAt: {
    type: mongoose.Schema.Types.Date,
  },
  updatedAt: {
    type: mongoose.Schema.Types.Date,
  },
}, { versionKey: false });

const usuarios = mongoose.model('usuarios', usuarioSchema);

export {
  usuarios,
  usuarioSchema,
};
