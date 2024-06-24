/* eslint-disable import/extensions */
import Controller from './Controller.js';
import PostagemService from '../service/PostagemService.js';

const postagemService = new PostagemService();

class PostagemController extends Controller {
  constructor() {
    super(postagemService);
    this.postagem = postagemService;
  }
}

export default PostagemController;
