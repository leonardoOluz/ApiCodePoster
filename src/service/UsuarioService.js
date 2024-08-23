/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import Services from './services.js';
import { createSalHash, decodeSalHash } from '../utils/salHash.js';
import { createToken } from '../utils/authUtils.js';
import ErrorIncorrectRequest from '../errors/ErrorIncorrectRequest.js';
import ErroBase from '../errors/ErrorBase.js';

class UsuarioService extends Services {
  constructor() {
    super('usuarios');
    this.image = new Services('images');
    this.posters = new Services('postagens');
  }

  async signUp(dtnb, dtnf) {
    const {
      nome, apelido, email, senha, confirmarSenha,
    } = dtnb;

    const {
      originalname: name, size, key, location: url = 'date',
    } = dtnf;

    if (senha !== confirmarSenha) {
      throw new ErroBase('As Senhas não são compativeis', 400);
    }

    const imageCreated = await this.image.createDate({
      name,
      size,
      key,
      url,
    });

    const [sal, senhaHash] = createSalHash(senha).split(':');
    await super.createDate({
      nome,
      apelido: `@${apelido}`,
      id_image: imageCreated._id,
      email,
      hash: senhaHash,
      sal,
    });

    return { message: 'Usuario criado com sucesso !' };
  }

  async login(senha, mail) {
    /* checar email no db */
    const userChecked = await super.getOne({ email: mail });
    /* verificar se há dados */
    if (userChecked) {
      /* Destruturar objeto usuario verificado */
      const {
        _id, nome, apelido, id_image, email, hash, sal,
      } = userChecked;
      /* se houver dados verificar sal e hash */
      if (await decodeSalHash(senha, hash, sal)) {
        /* se a senha conferir criar token */
        const image = await this.image.getOneId(id_image);
        const token = createToken({ id: userChecked._id, usuario: userChecked.nome });
        return {
          token,
          payload: {
            _id,
            nome,
            apelido,
            email,
            id_image: {
              url: image.url,
            },
          },
        };
      }
      throw new ErrorIncorrectRequest('Verifique sua senha de acesso !');
    } else {
      throw new ErrorIncorrectRequest('Verifique seu email ou faça um cadastro.');
    }
  }

  async getAllUser() {
    const returnedUser = 'nome apelido email id_image';
    const resultUsers = await super.getAllDate(returnedUser, 'id_image', 'url');
    return resultUsers;
  }

  async getAllUsersPosters() {
    const returnedUser = 'nome apelido email id_image';
    const returnedPosters = 'id_usuario titulo descricao linguagem codigo cor curtidas_id_usuario mensagem';
    const resultUsers = await super.getAllDate(returnedUser, 'id_image', 'url');
    const resultsPosters = await this.posters.getAllDate(returnedPosters);
    const returnResult = {
      resultUsers,
      resultsPosters,
    };

    return returnResult;
  }

  async getOneById(id) {
    const returned = 'nome apelido foto email';
    const result = await super.getOneId(id, returned);
    return result;
  }

  async getOneForQuery(dtn) {
    const returned = 'nome apelido foto email';
    const result = await super.getOne(dtn, returned);
    return result;
  }

  async deleteUserImage(id) {
    const userDeleted = await super.dropDate(id);
    if (userDeleted) {
      const imageDeleted = await this.image.dropDate({ _id: userDeleted.id_image });
      if (imageDeleted) {
        return { message: 'Usuario deletado com sucesso !' };
      }
      throw new ErrorIncorrectRequest('Verifique o identificador de image !');
    }
    throw new ErrorIncorrectRequest('Verifique o identificador de usuario !');
  }
}

export default UsuarioService;
