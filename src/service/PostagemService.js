/* eslint-disable import/extensions */
import Services from './services.js';

class PostagemService extends Services {
  constructor() {
    super('postagens');
    this.message = new Services('mensagens');
  }

  async getOneForQuery(dtn) {
    const returned = 'titulo descricao linguagem codigo cor curtidas_id_usuario mensagem';
    const result = await super.getOne(dtn, returned);
    return result;
  }

  async getAllPostersQuery(dtn) {
    const returned = 'titulo id_usuario descricao linguagem codigo cor curtidas_id_usuario mensagem';
    const result = await super.getAll(dtn, returned);
    return result;
  }

  async getAllPosterForTitulo(dtn) {
    const regex = RegExp(dtn, 'i');// Usando regex nativo do NodeJs.
    const returned = 'titulo id_usuario descricao linguagem codigo cor curtidas_id_usuario mensagem';
    const result = await super.getAll({ titulo: regex }, returned);
    return result;
  }

  async deletePosterMessagens(dtb) {
    const result = await this.message.deleteMany({ id_postagem: dtb });
    const resultPoster = await super.deleteOne({ _id: dtb });
    return { result, resultPoster };
  }
}

export default PostagemService;
