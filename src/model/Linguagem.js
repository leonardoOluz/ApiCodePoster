import mongoose from "mongoose";

const linguagemSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  linguagem: { type: String },
  texto: { type: String }
}, { versionKey: false });

const linguagens = mongoose.model("linguagens", linguagemSchema);

export {
  linguagens,
  linguagemSchema
};