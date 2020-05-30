import Auth from './Auth';
import error from '../helpers/error';
import uploadMemory from './uploadMemory';

const notFoundHandler = (req, res, next) => {
  next(new error.ErrorHandler('Endpoint not found', 404));
}

const middlewares = {
  notFoundHandler: notFoundHandler,
  Auth: Auth,
  uploadMemory: uploadMemory
}

export default middlewares;