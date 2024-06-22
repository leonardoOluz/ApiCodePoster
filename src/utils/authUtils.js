/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
const secret = process.env.SECRET;

function createToken(payload) {
  const dadosToken = jwt.sign(payload, secret, { expiresIn: "2h" });
  return dadosToken;
}
function checkToken(dados) {
  const tokenDescriptografado = jwt.verify(dados, secret);
  return tokenDescriptografado;
}

export {
  createToken,
  checkToken
}; 
