/* eslint-disable import/extensions */
import Services from './services.js';

class LinguagemService extends Services {
  constructor() {
    super('linguagens');
  }

  async getOneForQuery(dtn) {
    const returned = 'linguagem texto';
    const result = await super.getOne(dtn, returned);
    return result;
  }
}

export default LinguagemService;
