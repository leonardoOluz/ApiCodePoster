/* eslint-disable import/extensions */
import Controller from './Controller.js';
import UsuarioService from '../service/UsuarioService.js';
import ErrorIncorrectRequest from '../errors/ErrorIncorrectRequest.js';

const usuarioService = new UsuarioService();

class UsuarioController extends Controller {
  constructor() {
    super(usuarioService);
    this.usuario = usuarioService;
  }

  async getAllUser(req, res, next) {
    try {
      const result = await this.usuario.getAllUser();
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  async getOneById(req, res, next) {
    const { id } = req.params;
    try {
      const result = await this.usuario.getOneById(id);
      if (!result) {
        return next(
          new ErrorIncorrectRequest('Os dados fornecido não foram encontrado ou foram excluidos!'),
        );
      }
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export default UsuarioController;
