const { generateToken } = require('../auth/jwt');
const { errorObj } = require('../middlewares/error.middleware');
const userModel = require('../models/users.model');

const postLogin = async (payload) => {
  const { email, password } = payload;
  const user = await userModel.getUserByCredentials(email, password);
  if (!user) {
    throw errorObj(401, 'email, ou senha inválidos');
  }
  const token = generateToken({ email, password });

  return token;
};

module.exports = {
  postLogin,
};
