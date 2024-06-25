/* eslint-disable import/extensions */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import {
  describe, expect, it,
  jest,
} from '@jest/globals';
import { postagens } from '../../model/Postagem.js';

describe('Teste de modelo de postagem', () => {
  const postagemMock = {
    id_usuario: '667354473deeb5146cb21655',
    titulo: 'Titulo',
    descricao: 'Testando postagem',
    linguagem: 'php',
    codigo: '?php/> <php>',
    cor: '#f2f2f2',
    curtidas_id_usuario: [],
    mensagem: [],
  };

  it('instanciando uma nova linguagem', () => {
    const poster = postagens(postagemMock);
    expect(poster.titulo).toEqual(postagemMock.titulo);
    expect(poster.descricao).toEqual(postagemMock.descricao);
    expect(poster.linguagem).toEqual(postagemMock.linguagem);
    expect(poster.codigo).toEqual(postagemMock.codigo);
    expect(poster.cor).toEqual(postagemMock.cor);
  });

  it('Simular a criação de dados no DB.', () => {
    const postagem = postagens(postagemMock);
    postagem.create = jest.fn().mockReturnValue({
      id: '66788115b7a033461cfa031a',
      id_usuario: '667354473deeb5146cb21655',
      titulo: 'Titulo',
      descricao: 'Testando postagem',
      linguagem: 'php',
      codigo: '?php/> <php>',
      cor: '#f2f2f2',
      curtidas_id_usuario: [],
      mensagem: [],
    });

    const returned = postagem.create();
    expect(returned).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        ...postagemMock,
      }),
    );
  });
});
