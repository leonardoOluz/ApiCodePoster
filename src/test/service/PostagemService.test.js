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
  id_usuario: '667354473deeb5146cb21655',
  titulo: 'CodePen',
  descricao: 'Codigo gerado pelo codePen',
  linguagem: 'javascript',
  codigo: 'const app = (a, b) => {return a * b}',
  cor: '#f1f1f1',
  curtidas_id_usuario: [],
  mensagem: [],
};

describe('Testes de postagem no banco de dados', () => {
  const postagemService = new PostagemService();
  it('Criando postagem usando - createDate', async () => {
    const postagemCreate = await postagemService.createDate(dtnMock);
    dtnMock.id = postagemCreate._id;
    expect(postagemCreate.titulo).toEqual(dtnMock.titulo);
  });

  it('Verificar se os dados de postagem no DB são o mesmo do Mock - getOne', async () => {
    const postagemDb = await postagemService.getOne({ descricao: dtnMock.descricao });
    expect(postagemDb.descricao).toEqual(dtnMock.descricao);
    expect(postagemDb.cor).toEqual(dtnMock.cor);
  });

  it('Verificar todos os postagems - getAllDate', async () => {
    const arraypostagems = await postagemService.getAllDate();
    const chekpostagem = arraypostagems.some((item) => (
      item.descricao === dtnMock.descricao && item.codigo === dtnMock.codigo
    ));
    expect(chekpostagem).toBeTruthy();
  });

  it('Buscar postagem por id filtrando dados de postagem - getOneId', async () => {
    const postagemId = await postagemService.getOneId({ _id: dtnMock.id });
    expect(postagemId.cor).toEqual(dtnMock.cor);
  });

  it('Modificar texto da postagem - updateDate', async () => {
    dtnMock.cor = '#ffffff';
    await postagemService.updateDate(
      { _id: dtnMock.id },
      { cor: dtnMock.cor },
    );
    const newNamepostagem = await postagemService.getOneId({ _id: dtnMock.id });
    expect(newNamepostagem.cor).toEqual(dtnMock.cor);
  });

  it('Deletar postagem Mock do Db - dropDate', async () => {
    const result = await postagemService.dropDate({ _id: dtnMock.id });
    expect(result._id).toEqual(dtnMock.id);
  });
});
