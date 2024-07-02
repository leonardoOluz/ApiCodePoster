/* eslint-disable import/extensions */
import ErroBase from './ErrorBase.js';

class ErroValidation extends ErroBase {
  constructor(error) {
    const filterErrors = Object.values(error.errors).filter((err) => err.path !== 'sal');
    const typesErrors = filterErrors
      .map((err) => {
        if (err.path === 'hash') return `senha: ${err.message}`;
        if (err.path === 'sal') return '';
        return `${err.path}: ${err.message}`;
      })
      .join('; ');
    super(
      filterErrors.length > 1
        ? `Verifique as validações: ${typesErrors}`
        : `Verifique o campo ${typesErrors}`,
      400,
    );
  }
}

export default ErroValidation;
