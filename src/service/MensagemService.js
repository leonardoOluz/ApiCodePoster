/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import Services from './services.js';

class MensagemService extends Services {
  constructor() {
    super('mensagens');
    this.usuarioService = new Services('usuarios');
    this.postagemService = new Services('postagens');
  }

  async getOneForQuery(dtn) {
    const returned = 'texto';
    const result = await super.getOne(dtn, returned);
    return result;
  }

  async checkDateMessagemValidate(dtn) {
    const resultUser = await this.usuarioService.getOneId({ _id: dtn.id_usuario });
    if (!resultUser) {
      throw new Error('Não foi possivel identificar o usuario, verifique o Id ! ');
    }

    const resultPost = await this.postagemService.getOneId({ _id: dtn.id_postagem });
    if (!resultPost) {
      throw new Error('Não foi possivel identificar a postagem, verifique o Id ! ');
    }

    const msg = resultPost.mensagem;
    const saveMessage = await super.createDate(dtn);
    await msg.push(saveMessage._id);
    await this.postagemService.updateDate({ _id: dtn.id_postagem }, { mensagem: msg });
    return saveMessage;
  }

  async getAllMessagePoster(dtn) {
    const returned = 'id_postagem id_usuario texto createdAt';
    const result = await super.getAll(dtn, returned);
    return result;
  }
}

export default MensagemService;
