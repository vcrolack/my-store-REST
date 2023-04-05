const boom = require('@hapi/boom');
const { config } = require('../config/config');

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['api'];

  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
};

const checkAdminRole = (req, res, next) => {
  const { role } = req.user;
  role !== 1 ? next(boom.forbidden("You don't have permission for this")) : next();
};

const checkRoles = (...roles) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (roles.includes(role)) {
      next();
    } else {
      return next(boom.forbidden("You don't have enough permissions"));
    }
  }
};

module.exports = { checkApiKey, checkAdminRole, checkRoles };
