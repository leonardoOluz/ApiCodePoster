import Services from "./services.js";
import { createSalHash, decodeSalHash } from "../utils/salHash.js";
import { createToken } from "../utils/authUtils.js";

class UsuarioService extends Services {
  constructor() {
    super("usuarios");
  };

  async signUp(dtn) {
    const { nome, apelido, foto, email, senha } = dtn;
    const [sal, senhaHash] = createSalHash(senha).split(':');
    const created = await super.createDate({
      nome,
      apelido,
      foto,
      email,
      hash: senhaHash,
      sal: sal,
    });

    if (created) {
      return { message: "Usuario criado com sucesso !" };
    } 
    throw new Error(`Email existente!`);
        
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
      throw new Error(`Senha errada !`);
            
    } else {
      throw new Error(`Verifique seu email ou faça um cadastro.`);
    }
  };
}

export default UsuarioService;