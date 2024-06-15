import mongoose from "mongoose";

const linguagemSchema = mongoose.Schema({
})

const linguagens = mongoose.model("linguagens", linguagemSchema)

export { linguagens, linguagemSchema };