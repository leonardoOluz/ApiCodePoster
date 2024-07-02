/* eslint-disable import/extensions */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import {
  describe, expect, it,
  jest,
} from '@jest/globals';
import { linguagens } from '../../model/Linguagem.js';

describe('Teste de modelo de Linguagem', () => {
  const linguagemMock = {
    linguagem: 'flutter',
    texto: 'Flutter',
  };
  it('instanciando uma nova linguagem', () => {
    const linguagem = linguagens(linguagemMock);
    expect(linguagem).toEqual(
      expect.objectContaining(linguagemMock),
    );
  });
  it('Simular a criação de dados no DB.', () => {
    const linguagem = linguagens(linguagemMock);
    linguagem.create = jest.fn().mockReturnValue({
      id: '66788115b7a033461cfa031a',
      linguagem: 'flutter',
      texto: 'Flutter',
    });
    const returned = linguagem.create();
    expect(returned).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        ...linguagemMock,
      }),
    );
  });
});
