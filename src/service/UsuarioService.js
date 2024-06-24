/* eslint-disable import/extensions */
import Services from './services.js';
import { createSalHash, decodeSalHash } from '../utils/salHash.js';
import { createToken } from '../utils/authUtils.js';
import ErrorIncorrectRequest from '../errors/ErrorIncorrectRequest.js';
import ErroBase from '../errors/ErrorBase.js';

class UsuarioService extends Services {
  constructor() {
    super('usuarios');
  }

  async signUp(dtn) {
    const {
      nome, apelido, foto, email, senha,
    } = dtn;

    if (!senha) {
      throw new ErroBase('Verifique o campo senha', 400);
    }
    const [sal, senhaHash] = createSalHash(senha).split(':');

    await super.createDate({
      nome,
      apelido,
      foto,
      email,
      hash: senhaHash,
      sal,
    });
    return { message: 'Usuario criado com sucesso !' };
  }

  async login(senha, email) {
    /* checar email no db */
    const userChecked = await super.getOne({ email });
    /* verificar se há dados */
    if (userChecked) {
      /* se houver dados verificar sal e hash */
      if (await decodeSalHash(senha, userChecked.hash, userChecked.sal)) {
        /* se a senha conferir criar token */
        return createToken({ id: userChecked.id, usuario: userChecked.nome });
      }
      throw new ErrorIncorrectRequest('Verifique sua senha de acesso !');
    } else {
      throw new ErrorIncorrectRequest('Verifique seu email ou faça um cadastro.');
    }
  }

  async getAllUser() {
    const returned = 'nome apelido foto email';
    const result = await super.getAllDate(returned);
    return result;
  }

  async getOneById(id) {
    const returned = 'nome apelido foto email';
    const result = await super.getOneId(id, returned);
    return result;
  }
}

export default UsuarioService;
