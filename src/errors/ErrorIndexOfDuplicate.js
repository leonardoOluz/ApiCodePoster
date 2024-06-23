import ErroBase from "./ErrorBase.js";

class ErrorIndexOfDuplicate extends ErroBase {
  constructor(error) {
    const checkedDuplicateKey = Object.values(error);
    const value = Object.keys(checkedDuplicateKey[0].keyValue);
    super(`Este ${value} já está sendo utiizado, escolha outro ${value}`, 400);
  }
};

export default ErrorIndexOfDuplicate;