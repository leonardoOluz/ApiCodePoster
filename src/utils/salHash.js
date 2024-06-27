/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';
import ErroBase from '../errors/ErrorBase.js';

function createSalHash(senha) {
  const sal = randomBytes(16).toString('hex');
  const senhaHash = scryptSync(senha, sal, 64).toString('hex');
  return `${sal}:${senhaHash}`;
}
async function decodeSalHash(senha, hash, sal) {
  if (!senha) throw new ErroBase('Campo senha é obrigatório', 400);
  const testeHash = scryptSync(senha, sal, 64);
  const hashReal = Buffer.from(hash, 'hex');
  return timingSafeEqual(testeHash, hashReal);
}

export {
  createSalHash,
  decodeSalHash,
};
