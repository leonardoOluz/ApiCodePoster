/* eslint-disable import/extensions */
import Controller from './Controller.js';
import MensagemService from '../service/MensagemService.js';

const mensagemService = new MensagemService();

class MensagemController extends Controller {
  constructor() {
    super(mensagemService);
    this.mensagem = mensagemService;
  }

  async getOneForQuery(req, res, next) {
    const { texto } = req.query;
    try {
      const result = await this.mensagem.getOneForQuery({ texto });
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  async checkDateMessageSave(req, res, next) {
    const dtn = req.body;
    try {
      await this.mensagem.checkDateMessagemValidate(dtn);
      return res.status(200).json({ message: 'Mensagem salva com sucesso' });
    } catch (error) {
      return next(error);
    }
  }
}

export default MensagemController;
