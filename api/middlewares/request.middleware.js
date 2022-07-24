const { validateToken } = require('../auth/jwt');
const { errorObj } = require('./error.middleware');
require('dotenv').config();

const validateRequest = (req, res, next) => {
  const { authorization } = req.headers;

  let tokenBearer = authorization;

  if (!authorization) {
    throw errorObj(401, `'Você precisa estar logado' ${process.env.ENV}`);
  }

  if (authorization.includes('Bearer')) {
    const authorizationWithBearer = authorization.split(' ')[1];
    tokenBearer = authorizationWithBearer;
  }

  const isValid = validateToken(tokenBearer);

  if (!isValid && !isValid.email) {
    throw errorObj(401, 'você não tem autorização para acessar este endereço');
  }

  next();
};

module.exports = {
  validateRequest,
};
