import ErrorNotFound from "../errors/ErrorNotFound.js";

const errorNotFound404 = (req, res, next) =>{
  const error404 = new ErrorNotFound();
  return next(error404);
};

export default errorNotFound404;