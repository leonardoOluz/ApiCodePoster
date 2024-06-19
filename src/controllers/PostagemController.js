import Controller from "./Controller.js";
import PostagemService from "../service/PostagemService.js";
const postagem = new PostagemService();

class PostagemController extends Controller {
    constructor() {
        super(postagem)
    }
};

export default PostagemController;