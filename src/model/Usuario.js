import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  nome: {
    type: String,
    required: [true, 'É obrigatório'],
  },
  apelido: {
    type: String,
  },
  id_image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'images',
    required: [true, 'É obrigatório'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'É obrigatório'],
  },
  hash: {
    type: String,
    required: [true, 'É obrigatório'],
  },
  sal: {
    type: String,
  },
}, { timestamps: true, versionKey: false });

const usuarios = mongoose.model('usuarios', usuarioSchema);

export {
  usuarios,
  usuarioSchema,
};
