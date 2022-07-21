const { validateToken } = require('../auth/jwt');
const { errorObj } = require('./error.middleware');

const validateRequest = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw errorObj(401, 'Você precisa estar logado');
  }

  const isValid = validateToken(authorization);

  if (!isValid && !isValid.email) {
    throw errorObj(401, 'você não tem autorização para acessar este endereço');
  }

  next();
};

module.exports = {
  validateRequest,
};
