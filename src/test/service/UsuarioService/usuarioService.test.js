/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import {
  afterAll, beforeAll, describe, expect, it,
} from '@jest/globals';
import UsuarioService from '../../../service/UsuarioService.js';
import conexaoMongoose from '../../../../mongoose-setup.js';
import 'dotenv/config';

const { conexaoOn, disconnectionOff } = conexaoMongoose();

beforeAll(async () => {
  await conexaoOn();
});

afterAll(async () => {
  await disconnectionOff();
});

const dtnMock = {
  nome: 'Vanderlei Luz',
  apelido: '@Leyluz',
  foto: 'VanderleiLuz',
  email: 'ley@email.com',
  senha: 'vanderley123',
};

describe('Testes de Usuario no banco de dados', () => {
  const usuarioService = new UsuarioService();
  it('Um novo usuario será salvo no DB', async () => {
    const erroUserThrow = await usuarioService.signUp(dtnMock);
    expect(erroUserThrow).toEqual({ message: 'Usuario criado com sucesso !' });
  });

  it('Verificar se os dados do usuario no DB são o mesmo do Mock ', async () => {
    const userDb = await usuarioService.getOne({ nome: dtnMock.nome });
    dtnMock.id = userDb._id;
    expect(userDb.foto).toEqual(dtnMock.foto);
    expect(userDb.email).toEqual(dtnMock.email);
    expect(userDb.apelido).toEqual(dtnMock.apelido);
  });

  it('Verificar o retorno do token ao se logar com seu cumprimento', async () => {
    const accessToken = await usuarioService.login(dtnMock.senha, dtnMock.email);
    expect(accessToken).toHaveLength(163);
  });

  it('Verificar todos os usuarios', async () => {
    const arrayUsuarios = await usuarioService.getAllUser();
    const chekUsuario = arrayUsuarios.some((item) => item.nome === dtnMock.nome);
    expect(chekUsuario).toBeTruthy();
  });

  it('Deletar usuario Mock do Db', async () => {
    const result = await usuarioService.dropDate({ _id: dtnMock.id });
    expect(result.email).toContain(dtnMock.email);
  });
});
