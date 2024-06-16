import mongoose from "mongoose";

const mensagemSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    id_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios",
        required: [true, "O usuario é obrigatório"]
    },
    texto: { type: mongoose.Schema.Types.ObjectId }
}, { versionKey: false });

const mensagens = mongoose.model("mensagens", mensagemSchema);

export {
    mensagens,
    mensagemSchema
};