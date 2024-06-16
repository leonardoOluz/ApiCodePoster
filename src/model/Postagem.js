import mongoose from "mongoose";
const postagemSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    id_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios",
        required: [true, "Obrigatório o usuário"]
    },
    titulo: { type: String },
    descricao: { type: String },
    linguagem: { type: String },
    codigo: { type: String },
    cor: { type: String },
    curtidas_id_usuario: [String],
    mensagem: [mongoose.Schema.Types.ObjectId],
    /* colocar os objetos msg e like */
});

const postagens = mongoose.model("postagens", postagemSchema)

export {
    postagens,
    postagemSchema
}