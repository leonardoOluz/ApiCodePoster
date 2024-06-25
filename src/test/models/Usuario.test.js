/* eslint-disable import/extensions */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import {
  describe, expect, it,
  jest,
} from '@jest/globals';
import { usuarios } from '../../model/Usuario.js';

describe('Teste de modelo de usuario', () => {
  const usuarioMock = {
    nome: 'Leonardo Luz',
    apelido: '@LeoLuz',
    foto: 'LeoLuz',
    email: 'leo@email.com',
    hash: '123456789qwertyuiop123456789qwertyuiop',
    sal: '123456789qwertyuiop123456789qwertyuiop',
  };

  it('instanciando uma nova usuario', () => {
    const usuario = usuarios(usuarioMock);
    expect(usuario).toEqual(
      expect.objectContaining(usuarioMock),
    );
  });

  it('Simular a criação de dados no DB.', () => {
    const usuario = usuarios(usuarioMock);
    usuario.create = jest.fn().mockReturnValue({
      id: '66788115b7a033461cfa031a',
      nome: 'Leonardo Luz',
      apelido: '@LeoLuz',
      foto: 'LeoLuz',
      email: 'leo@email.com',
      hash: '123456789qwertyuiop123456789qwertyuiop',
      sal: '123456789qwertyuiop123456789qwertyuiop',
    });

    const returned = usuario.create();
    expect(returned).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        ...usuarioMock,
      }),
    );
  });
});
