/* eslint-disable import/extensions */
import ErroBase from './ErrorBase.js';

class ErroValidation extends ErroBase {
  constructor(error) {
    const typesErrors = Object.values(error.errors)
      .map((err) => `${err.path}: ${err.message}`)
      .join('; ');
    super(
      Object.values(error.errors).length > 1
        ? `Verifique as validações: ${typesErrors}`
        : `Verifique o campo ${typesErrors}`,
      400,
    );
  }
}

export default ErroValidation;
