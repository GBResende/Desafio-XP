const { checkPostUser, checkbankTransition, checkStockTransition } = require('../utils/checkFunctions');

const validateUser = (req, res, next) => {
  const user = req.body;
  checkPostUser(user).map(({ check, result }) => check && result());
  next();
};

const validateBankTransition = (req, res, next) => {
  const payload = req.body;
  checkbankTransition(payload).map(({ check, result }) => check && result());
  next();
};

const validateStockTransition = (req, res, next) => {
  const payload = req.body;
  checkStockTransition(payload).map(({ check, result }) => check && result());
  next();
};

module.exports = {
  validateUser,
  validateBankTransition,
  validateStockTransition,
};
