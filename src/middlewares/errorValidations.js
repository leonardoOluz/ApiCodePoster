/* eslint-disable no-unused-vars */
import mongoose from "mongoose";
import ErroBase from "../errors/ErrorBase.js";
import ErroValidation from "../errors/ErrorValidation.js";

const errorValidations = (error, req, res, next) => {
  if (error instanceof mongoose.Error.ValidationError) {
    return new ErroValidation(error).sendResponse(res);
  } else if (error.message.indexOf('duplicate key error') !== -1) {
    return new ErroBase(error.message, 400).sendResponse(res);
  }
  return new ErroBase(error.message,).sendResponse(res);
};

export default errorValidations;


