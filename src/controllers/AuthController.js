/* eslint-disable no-unused-vars */
import Controller from "./Controller.js";
import UsuarioService from "../service/UsuarioService.js";
const usuario = new UsuarioService();


class AuthController extends Controller {
    constructor() {
        super(usuario)
    }

    async signUp(req, res, next) {
        const dtn = req.body
        try {
            const newUser = await usuario.signUp(dtn);
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async login(req, res, next) {
        const { email, senha } = req.body;
        try {
            const userChecked = await usuario.login(senha, email)
            return res.status(200).json({ message: userChecked });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export default AuthController;