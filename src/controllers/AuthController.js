/* eslint-disable import/extensions */
import Controller from './Controller.js';
import UsuarioService from '../service/UsuarioService.js';
import ErrorIncorrectRequest from '../errors/ErrorIncorrectRequest.js';

const usuarioService = new UsuarioService();

class AuthController extends Controller {
  constructor() {
    super(usuarioService);
    this.usuario = usuarioService;
  }

  async signUp(req, res, next) {
    const dtnb = req.body;
    const dtnf = req.file;

    try {
      if (req.file) {
        const newUser = await this.usuario.signUp(dtnb, dtnf);
        return res.status(200).json(newUser);
      }
      return next(
        new ErrorIncorrectRequest('Verifique o arquivo enviado,'),
      );
    } catch (error) {
      return next(error);
    }
  }

  async login(req, res, next) {
    const { email, senha } = req.body;
    try {
      const userChecked = await this.usuario.login(senha, email);
      return res.status(200).json(userChecked);
    } catch (error) {
      return next(error);
    }
  }
}

export default AuthController;
