/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import {
  afterAll, beforeAll, describe, expect, it,
} from '@jest/globals';
import MensagemService from '../../service/MensagemService.js';
import conexaoMongoose from '../../../mongoose-setup.js';

const { conexaoOn, disconnectionOff } = conexaoMongoose();

beforeAll(async () => {
  await conexaoOn();
});

afterAll(async () => {
  await disconnectionOff();
});

const dtnMock = {
  id_postagem: '6670b4f9b9c9bf84bf644842',
  id_usuario: '667354473deeb5146cb21655',
  texto: 'Muito bacana esse codígo está usando SOLID.',
};

describe('Testes de mensagem no banco de dados', () => {
  const mensagemService = new MensagemService();
  it('Criando mensagem usando - createDate', async () => {
    const mensagemCreate = await mensagemService.createDate(dtnMock);
    dtnMock.id = mensagemCreate._id;
    expect(mensagemCreate.texto).toEqual(dtnMock.texto);
  });

  it('Verificar se os dados da mensagem no DB são o mesmo do Mock - getOne', async () => {
    const mensagemDb = await mensagemService.getOne({ texto: dtnMock.texto });
    expect(mensagemDb.texto).toEqual(dtnMock.texto);
  });

  it('Verificar todos os mensagems - getAllDate', async () => {
    const arraymensagems = await mensagemService.getAllDate();
    const chekmensagem = arraymensagems.some((item) => item.texto === dtnMock.texto);
    expect(chekmensagem).toBeTruthy();
  });

  it('Buscar mensagem por id filtrando dados de mensagem - getOneId', async () => {
    const mensagemId = await mensagemService.getOneId({ _id: dtnMock.id });
    expect(mensagemId.texto).toEqual(dtnMock.texto);
  });

  it('Modificar texto da mensagem - updateDate', async () => {
    dtnMock.texto = 'Testando a mudança do texto!';
    await mensagemService.updateDate(
      { _id: dtnMock.id },
      { texto: dtnMock.texto },
    );
    const newNamemensagem = await mensagemService.getOne({ texto: dtnMock.texto });
    expect(newNamemensagem.texto).toEqual(dtnMock.texto);
  });

  it('Deletar mensagem Mock do Db - dropDate', async () => {
    const result = await mensagemService.dropDate({ _id: dtnMock.id });
    expect(result._id).toEqual(dtnMock.id);
  });
});
