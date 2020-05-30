class ErrorHandler extends Error {
  constructor(message, statusCode = 500) {
    super();
    this.error = true;
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  let { statusCode, message } = err;
  statusCode = statusCode || 500;
  res.status(statusCode).send({
    error: true,
    statusCode: statusCode,
    message: message
  });
};

export default {
  ErrorHandler,
  handleError
}