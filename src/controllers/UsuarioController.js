import Controller from "./Controller.js";
import UsuarioService from "../service/UsuarioService.js";
const usuario = new UsuarioService();


class UsuarioController extends Controller {
    constructor(){
        super(usuario)
    }
};

export default UsuarioController;