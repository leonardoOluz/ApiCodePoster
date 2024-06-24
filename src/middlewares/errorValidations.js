/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import ErroBase from '../errors/ErrorBase.js';
import ErroValidation from '../errors/ErrorValidation.js';
import ErrorIncorrectRequest from '../errors/ErrorIncorrectRequest.js';
import ErrorIndexOfDuplicate from '../errors/ErrorIndexOfDuplicate.js';

const errorValidations = (error, req, res, next) => {
  if (error instanceof mongoose.Error.ValidationError) {
    return new ErroValidation(error).sendResponse(res);
  } if (error.message.indexOf('duplicate key error') !== -1) {
    return new ErrorIndexOfDuplicate(error).sendResponse(res);
  } if (error instanceof mongoose.Error.CastError) {
    return new ErrorIncorrectRequest().sendResponse(res);
  } if (error instanceof ErrorIncorrectRequest) {
    return new ErrorIncorrectRequest(error.message).sendResponse(res);
  } if (error instanceof ErroBase) {
    error.sendResponse(res);
  }
  return new ErroBase(error.message).sendResponse(res);
};

export default errorValidations;
