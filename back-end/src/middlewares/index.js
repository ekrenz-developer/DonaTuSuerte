import error from '../helpers/error';

const notFoundHandler = (req, res, next) => {
  next(new error.ErrorHandler('Endpoint not found', 404));
}

const middlewares = {
  notFoundHandler: notFoundHandler
}

export default middlewares;