/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import {
  afterAll, beforeAll, describe, expect, it,
} from '@jest/globals';
import PostagemService from '../../service/PostagemService.js';
import conexaoMongoose from '../../../mongoose-setup.js';

const { conexaoOn, disconnectionOff } = conexaoMongoose();

beforeAll(async () => {
  await conexaoOn();
});

afterAll(async () => {
  await disconnectionOff();
});

const dtnMock = {
};

describe.skip('Testes de postagem no banco de dados', () => {
  const postagemService = new PostagemService();
  it('Criando postagem usando - createDate', async () => {
    const postagemCreate = await postagemService.createDate(dtnMock);
    expect(postagemCreate).toEqual(
      expect.objectContaining(dtnMock),
    );
  });

  it('Verificar se os dados de postagem no DB são o mesmo do Mock - getOne', async () => {
    const postagemDb = await postagemService.getOne({ postagem: dtnMock.postagem });
    dtnMock.id = postagemDb._id;
    expect(postagemDb.postagem).toEqual(dtnMock.postagem);
    expect(postagemDb.texto).toEqual(dtnMock.texto);
  });

  it('Verificar todos os postagems - getAllDate', async () => {
    const arraypostagems = await postagemService.getAllDate();
    const chekpostagem = arraypostagems.some((item) => item.postagem === dtnMock.postagem);
    expect(chekpostagem).toBeTruthy();
  });

  it('Buscar postagem por id filtrando dados de postagem - getOneId', async () => {
    const postagemId = await postagemService.getOneId({ _id: dtnMock.id });
    expect(postagemId.postagem).toEqual(dtnMock.postagem);
  });

  it('Modificar texto da postagem - updateDate', async () => {
    dtnMock.texto = 'Testando a mudança do texto!';
    await postagemService.updateDate(
      { _id: dtnMock.id },
      { texto: dtnMock.texto },
    );
    const newNamepostagem = await postagemService.getOne({ texto: dtnMock.texto });
    expect(newNamepostagem.texto).toEqual(dtnMock.texto);
  });

  it('Deletar postagem Mock do Db - dropDate', async () => {
    const result = await postagemService.dropDate({ _id: dtnMock.id });
    expect(result._id).toEqual(dtnMock.id);
  });
});
