/* eslint-disable camelcase */
/* eslint-disable import/extensions */
import Controller from './Controller.js';
import PostagemService from '../service/PostagemService.js';

const postagemService = new PostagemService();

class PostagemController extends Controller {
  constructor() {
    super(postagemService);
    this.postagem = postagemService;
  }

  async getOneForQuery(req, res, next) {
    const { titulo } = req.query;
    try {
      const result = await this.postagem.getOneForQuery({ titulo });
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  async getAllForQuery(req, res, next) {
    const { id_usuario } = req.query;
    try {
      const result = await this.postagem.getAllPostersQuery({ id_usuario });
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  async getAllPosterForTitulo(req, res, next) {
    const { titulo } = req.query;
    try {
      const result = await this.postagem.getAllPosterForTitulo(titulo);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  async deletePosterMessagens(req, res, next) {
    const { id } = req.params;
    try {
      const result = await this.postagem.deletePosterMessagens(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export default PostagemController;
