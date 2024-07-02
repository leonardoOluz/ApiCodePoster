/* eslint-disable import/extensions */
import Controller from './Controller.js';
import LinguagemService from '../service/LinguagemService.js';

const linguagemService = new LinguagemService();

class LinguagemController extends Controller {
  constructor() {
    super(linguagemService);
    this.linguagem = linguagemService;
  }

  async getOneForQuery(req, res, next) {
    const { linguagem } = req.query;
    try {
      const result = await this.linguagem.getOneForQuery({ linguagem });
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export default LinguagemController;
