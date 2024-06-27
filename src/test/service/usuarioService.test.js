/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import {
  afterAll, beforeAll, describe, expect, it,
} from '@jest/globals';
import UsuarioService from '../../service/UsuarioService.js';
import conexaoMongoose from '../../../mongoose-setup.js';
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
  email: 'vanderleypereira@email.com',
  senha: 'vanderley123',
};

describe('Testes de Usuario no banco de dados', () => {
  const usuarioService = new UsuarioService();
  it('Um novo usuario será salvo no DB - signUp', async () => {
    const erroUserThrow = await usuarioService.signUp(dtnMock);
    expect(erroUserThrow).toEqual({ message: 'Usuario criado com sucesso !' });
  });

  it('Verificar se os dados do usuario no DB são o mesmo do Mock - getOne', async () => {
    const userDb = await usuarioService.getOne({ nome: dtnMock.nome });
    dtnMock.id = userDb._id;
    expect(userDb.foto).toEqual(dtnMock.foto);
    expect(userDb.email).toEqual(dtnMock.email);
    expect(userDb.apelido).toEqual(dtnMock.apelido);
  });

  it('Verificar o retorno do token e ckecar o cumprimento do texto de token para validar. - login', async () => {
    const accessToken = await usuarioService.login(dtnMock.senha, dtnMock.email);
    expect(accessToken).toHaveLength(205);
  });

  it('Verificar todos os usuarios - getAllUser', async () => {
    const arrayUsuarios = await usuarioService.getAllUser();
    const chekUsuario = arrayUsuarios.some((item) => item.nome === dtnMock.nome);
    expect(chekUsuario).toBeTruthy();
  });

  it('Verificar todos os usuarios - getAllDate', async () => {
    const arrayUsuarios = await usuarioService.getAllDate();
    const chekUsuario = arrayUsuarios.some((item) => item.nome === dtnMock.nome);
    expect(chekUsuario).toBeTruthy();
  });

  it('Buscar usuario por id filtrando dados de usuario - getOneById', async () => {
    const usuarioId = await usuarioService.getOneById({ _id: dtnMock.id });
    expect(usuarioId.apelido).toEqual(dtnMock.apelido);
  });

  it('Buscar usuario por id filtrando dados de usuario - getOneId', async () => {
    const usuarioId = await usuarioService.getOneId({ _id: dtnMock.id });
    expect(usuarioId.apelido).toEqual(dtnMock.apelido);
  });

  it('Modificar nome do usuario - updateDate', async () => {
    dtnMock.nome = 'Vanderley pereira da Luz';
    await usuarioService.updateDate(
      { _id: dtnMock.id },
      { nome: dtnMock.nome },
    );
    const newNameUsuario = await usuarioService.getOne({ nome: dtnMock.nome });
    expect(newNameUsuario.nome).toEqual(dtnMock.nome);
  });

  it('Deletar usuario Mock do Db - dropDate', async () => {
    const result = await usuarioService.dropDate({ _id: dtnMock.id });
    expect(result.email).toContain(dtnMock.email);
  });

  it('Criando usuario usando - createDate', async () => {
    const usuarioCreate = await usuarioService.createDate({
      nome: dtnMock.nome,
      apelido: dtnMock.apelido,
      foto: dtnMock.foto,
      email: dtnMock.email,
      hash: '123456789abcdefghij',
      sal: '123456789abcdefghijlmnopqrstuv',
    });
    expect(usuarioCreate).toEqual(
      expect.objectContaining({
        nome: dtnMock.nome,
        apelido: dtnMock.apelido,
        foto: dtnMock.foto,
        email: dtnMock.email,
        hash: '123456789abcdefghij',
        sal: '123456789abcdefghijlmnopqrstuv',
      }),
    );
    await usuarioService.dropDate({ _id: usuarioCreate._id });
  });
});
