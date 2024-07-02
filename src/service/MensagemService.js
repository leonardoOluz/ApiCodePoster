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
    msg.push(saveMessage.id);
    await this.postagemService.updateDate({ _id: dtn.id_postagem }, { mensagem: msg });
    return saveMessage;
  }
}

export default MensagemService;
