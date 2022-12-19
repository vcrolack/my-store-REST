const { ValidationError } = require('sequelize');

function logErrors(error, req, res, next) {
  console.error(error);
  next(error);
}

function emailError(error, req, res, next) {
  if (error instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      error: error.errors[0].type,
      message: error.errors[0].message,
    });
  }
}

function errorHandler(error, req, res, next) {
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
}

function boomErrorHandler(error, req, res, next) {
  if (error.isBoom) {
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  }
  next(error);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, emailError };
