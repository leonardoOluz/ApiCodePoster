import jwt from "jsonwebtoken";
const secret = process.env.SECRET;

function criarToken(dados) {
    const dadosToken = jwt.sign(dados, secret, { expiresIn: '1h' })
    return dadosToken;
}
function verificarToken(dados) {
    const tokenDescriptografado = jwt.verify(dados, secret)
    return tokenDescriptografado;
}

export default {
    criarToken,
    verificarToken
} 
