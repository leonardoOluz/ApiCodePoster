/* eslint-disable import/extensions */
import Controller from './Controller.js';
import MensagemService from '../service/MensagemService.js';

const mensagem = new MensagemService();

class MensagemController extends Controller {
  constructor() {
    super(mensagem);
  }

  async checkDateMessageSave(req, res, next) {
    const dtn = req.body;
    try {
      const result = await this.mensagem.checkDateMessagemValidate(dtn);
      return res.status(200).json({ message: 'Mensagem salva com sucesso', result });
    } catch (error) {
      return next(error);
    }
  }
}

export default MensagemController;
