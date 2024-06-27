/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import {
  afterAll, beforeAll, describe, expect, it,
} from '@jest/globals';
import LinguagemService from '../../service/LinguagemService.js';
import conexaoMongoose from '../../../mongoose-setup.js';

const { conexaoOn, disconnectionOff } = conexaoMongoose();

beforeAll(async () => {
  await conexaoOn();
});

afterAll(async () => {
  await disconnectionOff();
});

const dtnMock = {
  linguagem: 'flutter',
  texto: 'flutter com Darter',
};

describe.skip('Testes de linguagem no banco de dados', () => {
  const linguagemService = new LinguagemService();
  it('Criando linguagem usando - createDate', async () => {
    const linguagemCreate = await linguagemService.createDate(dtnMock);
    expect(linguagemCreate).toEqual(
      expect.objectContaining(dtnMock),
    );
  });

  it('Verificar se os dados do linguagem no DB são o mesmo do Mock - getOne', async () => {
    const linguageDb = await linguagemService.getOne({ linguagem: dtnMock.linguagem });
    dtnMock.id = linguageDb._id;
    expect(linguageDb.linguagem).toEqual(dtnMock.linguagem);
    expect(linguageDb.texto).toEqual(dtnMock.texto);
  });

  it('Verificar todos os linguagems - getAllDate', async () => {
    const arraylinguagems = await linguagemService.getAllDate();
    const cheklinguagem = arraylinguagems.some((item) => item.linguagem === dtnMock.linguagem);
    expect(cheklinguagem).toBeTruthy();
  });

  it('Buscar linguagem por id filtrando dados de linguagem - getOneId', async () => {
    const linguagemId = await linguagemService.getOneId({ _id: dtnMock.id });
    expect(linguagemId.linguagem).toEqual(dtnMock.linguagem);
  });

  it('Modificar texto da linguagem - updateDate', async () => {
    dtnMock.texto = 'Testando a mudança do texto!';
    await linguagemService.updateDate(
      { _id: dtnMock.id },
      { texto: dtnMock.texto },
    );
    const newNamelinguagem = await linguagemService.getOne({ texto: dtnMock.texto });
    expect(newNamelinguagem.texto).toEqual(dtnMock.texto);
  });

  it('Deletar linguagem Mock do Db - dropDate', async () => {
    const result = await linguagemService.dropDate({ _id: dtnMock.id });
    expect(result._id).toEqual(dtnMock.id);
  });
});
