import Controller from "./Controller.js";
import UsuarioService from "../service/UsuarioService.js";
const usuario = new UsuarioService();


class UsuarioController extends Controller {
  constructor(){
    super(usuario);
  }

  async getAllUser(req, res, next){
    try {
      const result = await usuario.getAllUser();
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  async getOneById(req, res, next){
    const {id} = req.params;
    try {
      const result = await usuario.getOneById(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

};

export default UsuarioController;