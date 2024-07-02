/* eslint-disable import/extensions */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import {
  describe, expect, it,
  jest,
} from '@jest/globals';
import { mensagens } from '../../model/Mensagem.js';

describe('Testando o modelo Linguagem', () => {
  const mensagemMock = {
    id_usuario: '667354473deeb5146cb21655',
    id_postagem: '667883abf1f0c7688d9ae507',
    texto: 'Teste de modelo mensagem',
  };
  it('instanciando uma nova linguagem', () => {
    const mensagem = mensagens(mensagemMock);
    expect(mensagem.texto).toEqual(mensagemMock.texto);
  });
  it('Simular a criação de dados no DB.', () => {
    const mensagem = mensagens(mensagemMock);
    mensagem.create = jest.fn().mockReturnValue({
      id: '66788115b7a033461cfa031a',
      id_postagem: '667883abf1f0c7688d9ae507',
      id_usuario: '667354473deeb5146cb21655',
      texto: 'Teste de modelo mensagem',
    });

    const returned = mensagem.create();
    expect(returned).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        ...mensagemMock,
      }),
    );
  });
});
