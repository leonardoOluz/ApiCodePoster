import mongoose from 'mongoose';

const linguagemSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  linguagem: {
    type: String,
    required: [true, 'É obrigatório'],
  },
  texto: { type: String },
}, { timestamps: true, versionKey: false });

const linguagens = mongoose.model('linguagens', linguagemSchema);

export {
  linguagens,
  linguagemSchema,
};
