import ErroBase from "./ErrorBase.js";

class ErroValidation extends ErroBase {
  constructor(error) {
    const typesErrors = Object.values(error.errors)
      .map(error => `${error.path}: ${error.message}`)
      .join('; ');
    super(
      Object.values(error.errors).length > 1 ?
        `Verifique as validações: ${typesErrors}` :
        `verifique a validação: ${typesErrors}`,
      400
    );
  }
}

export default ErroValidation;