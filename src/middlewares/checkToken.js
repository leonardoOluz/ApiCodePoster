/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import pkg from 'jsonwebtoken';
import UsuarioService from '../service/UsuarioService.js';

const { verify, decode } = pkg;

const usuarioService = new UsuarioService();

const checkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Necessário informar o token' });
    }

    const [, acessToken] = token.split(' ');
    verify(acessToken, process.env.SECRET);
    const { id, usuario } = decode(acessToken);
    const result = await usuarioService.getOneId(id);

    if (result) {
      req.id = id;
      req.user = usuario;
      return next();
    }

    return res.status(404).json({ message: 'Verifique o acesso do usuario!' });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default checkToken;
