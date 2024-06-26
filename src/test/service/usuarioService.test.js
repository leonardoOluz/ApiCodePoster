/* eslint-disable import/extensions */
import {
  afterAll, beforeAll, describe, expect, it,
} from '@jest/globals';
import mongoose from 'mongoose';
import UsuarioService from '../../service/UsuarioService.js';
import 'dotenv/config';

beforeAll(async () => {
  await mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
});

const dtnMock = {
  nome: 'Vanderlei Luz',
  apelido: '@vanderleiluz',
  foto: 'VanderleiLuz',
  email: 'vanderley@email.com',
  senha: 'vanderley123',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('Testando a authService.cadastrarUsuario', () => {
  const usuarioService = new UsuarioService();
  it('O usuario deve possuir nome, apelido, foto', async () => {
    const usuarioSaved = await usuarioService.signUp(dtnMock);
    expect(usuarioSaved).toEqual({ message: 'Usuario criado com sucesso !' });
  });
});
