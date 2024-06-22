/* eslint-disable no-undef */
import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';

function createSalHash(senha) {
  const sal = randomBytes(16).toString('hex');
  const senhaHash = scryptSync(senha, sal, 64).toString('hex');
  return `${sal}:${senhaHash}`;

}
async function decodeSalHash(senha, hash, sal) {
  const testeHash = scryptSync(senha, sal, 64);
  const hashReal = Buffer.from(hash, 'hex');
  return timingSafeEqual(testeHash, hashReal);
}

export {
  createSalHash,
  decodeSalHash
};