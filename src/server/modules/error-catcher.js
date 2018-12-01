function wrapMiddleware(middleWare) {
  return async (request, result, next) => {
    try {
      await middleWare(request, result, next);
    } catch (error) {
      const status = error.status || 500;
      // Note, in a production app, do not include stack trace in http response
      result.status(status).send({
        status: status,
        message: error.message,
        stack: error.stack
      });
    }
  };
}

class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

module.exports = function errorCatcher(app) {
  app.errorCatcher = wrapMiddleware;
  app.throwCustom = (status, message) => {
    throw new CustomError(status, message);
  };
};
