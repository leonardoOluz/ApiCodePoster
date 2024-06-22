import Controller from "./Controller.js";
import LinguagemService from "../service/LinguagemService.js";
const linguagem = new LinguagemService();


class LinguagemController extends Controller {
  constructor(){
    super(linguagem);
  }
};

export default LinguagemController;