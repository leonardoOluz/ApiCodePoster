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
}

export default PostagemController;
