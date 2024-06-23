import Services from "./services.js";
import { createSalHash, decodeSalHash } from "../utils/salHash.js";
import { createToken } from "../utils/authUtils.js";
import ErrorIncorrectRequest from "../errors/ErrorIncorrectRequest.js";
import ErroBase from "../errors/ErrorBase.js";

class UsuarioService extends Services {
  constructor() {
    super("usuarios");
  };

  async signUp(dtn) {
    const { nome, apelido, foto, email, senha } = dtn;

    if (!senha) {
      throw new ErroBase("Verifique o campo senha", 400);
    }
    const [sal, senhaHash] = createSalHash(senha).split(':');

    const created = await super.createDate({
      nome,
      apelido,
      foto,
      email,
      hash: senhaHash,
      sal: sal,
    });
    return { message: "Usuario criado com sucesso !", created };
  };

  async login(senha, email) {
    /* checar email no db */
    const userChecked = await super.getOne({ email });
    /* verificar se há dados */
    if (userChecked) {
      /* se houver dados verificar sal e hash */
      if (await decodeSalHash(senha, userChecked.hash, userChecked.sal)) {
        /* se a senha conferir criar token */
        return createToken({ id: userChecked._id, usuario: userChecked.nome });
      }
      throw new ErrorIncorrectRequest('Verifique sua senha de acesso !');

    } else {
      throw new ErrorIncorrectRequest('Verifique seu email ou faça um cadastro.');
    }
  };
}

export default UsuarioService;