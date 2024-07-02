import mongoose from 'mongoose';

const postagemSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  id_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    cast: 'Precisa ser um ObjectId',
    ref: 'usuarios',
    required: [true, 'É obrigatório'],
  },
  titulo: {
    type: String,
    required: [true, 'É obrigatório'],
  },
  descricao: {
    type: String,
    required: [true, 'É obrigatório'],
  },
  linguagem: {
    type: String,
    required: [true, 'É obrigatório'],
  },
  codigo: {
    type: String,
    required: [true, 'É obrigatório'],
  },
  cor: {
    type: String,
    required: [true, 'É obrigatório'],
  },
  curtidas_id_usuario: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuarios',
  }],
  mensagem: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mensagens',
  }],
}, { timestamps: true, versionKey: false });

const postagens = mongoose.model('postagens', postagemSchema);

export {
  postagens,
  postagemSchema,
};
