const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'passaporteXP';

const generateToken = (user) => {
  const jwtToken = jwt.sign(user, secret);

  return jwtToken;
};

const validateToken = (token) => jwt.verify(token, secret);

module.exports = {
  generateToken,
  validateToken,
};
