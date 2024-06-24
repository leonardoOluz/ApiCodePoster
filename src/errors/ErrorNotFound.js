/* eslint-disable import/extensions */
import ErroBase from './ErrorBase.js';

class ErrorNotFound extends ErroBase {
  constructor(message = 'Pagina não encontrada!') {
    super(message, 404);
  }
}

export default ErrorNotFound;
