/* eslint-disable import/extensions */
import ErroBase from '../errors/ErrorBase.js';
import ErrorIncorrectRequest from '../errors/ErrorIncorrectRequest.js';

class Controller {
  constructor(nameService) {
    this.service = nameService;
  }

  async getOneDateId(req, res, next) {
    const { id } = req.params;
    try {
      const data = await this.service.getOneId(id);
      if (!data) {
        return next(
          new ErrorIncorrectRequest('Os dados fornecido não foram encontrado ou foram excluidos!'),
        );
      }
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  }

  async getAllDate(req, res, next) {
    try {
      const listRegister = await this.service.getAllDate();
      return res.status(200).json(listRegister);
    } catch (error) {
      return next(error);
    }
  }

  async createDate(req, res, next) {
    const dtn = req.body;
    try {
      const newDate = await this.service.createDate(dtn);
      if (!newDate) return next(new ErroBase('Erro não identificado, tente novamente mais tarde!'));
      return res.status(200).json({ message: 'dados criado com sucesso!' });
    } catch (error) {
      return next(error);
    }
  }

  async updateDate(req, res, next) {
    const dtn = req.body;
    const { id } = req.params;
    try {
      const uptdatedDate = await this.service.updateDate(id, dtn);
      if (!uptdatedDate) {
        return next(
          new ErrorIncorrectRequest('Os dados fornecido não foram encontrado ou foram excluidos!'),
        );
      }
      return res.status(200).json({ message: `id: ${id} foi atualizado com sucesso` });
    } catch (error) {
      return next(error);
    }
  }

  async dropDate(req, res, next) {
    const { id } = req.params;
    try {
      const deletedDate = await this.service.dropDate(id);
      if (!deletedDate) {
        return next(
          new ErrorIncorrectRequest('Os dados fornecido não foram encontrado ou foram excluidos!'),
        );
      }
      return res.status(200).json({ message: `id: ${id} foi deletado com sucesso` });
    } catch (error) {
      return next(error);
    }
  }
}

export default Controller;
