/* eslint-disable import/extensions */
import Controller from './Controller.js';
import LinguagemService from '../service/LinguagemService.js';

const linguagemService = new LinguagemService();

class LinguagemController extends Controller {
  constructor() {
    super(linguagemService);
    this.linguagem = linguagemService;
  }
}

export default LinguagemController;
