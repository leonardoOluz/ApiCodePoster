/* eslint-disable import/extensions */
import Services from './services.js';

class PostagemService extends Services {
  constructor() {
    super('postagens');
  }

  async getOneForQuery(dtn) {
    const returned = 'titulo descricao linguagem codigo cor curtidas_id_usuario mensagem';
    const result = await super.getOne(dtn, returned);
    return result;
  }
}

export default PostagemService;
