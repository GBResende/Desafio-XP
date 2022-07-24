const { errorObj } = require('../middlewares/error.middleware');

const validateEmailRegex = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const checkPostUser = (payload) => ([
  {
    check: !payload.name,
    result: () => { throw errorObj(400, 'Nome é obrigatório'); },
  },
  {
    check: payload.name.length <= 3,
    result: () => { throw errorObj(400, 'name deve ter no mínimo 3 caracteres'); },
  },
  {
    check: !payload.email,
    result: () => { throw errorObj(400, 'Email é obrigatório'); },
  },
  {
    check: !validateEmailRegex(payload.email),
    result: () => { throw errorObj(400, 'Email inválido'); },
  },
  {
    check: !payload.password,
    result: () => { throw errorObj(400, 'Senha é obrigatória'); },
  },
  {
    check: payload.password.length <= 8,
    result: () => { throw errorObj(400, 'A senha deve ter no mínimo 8 caracteres    '); },
  },
]);

const checkbankTransition = ({ userId, amount }) => ([
  {
    check: !userId || !amount,
    result: () => { throw errorObj(400, 'Os dados são obrigatórios e não podem ser igual a 0'); },
  },
  {
    check: Number.isNaN(+userId) || Number.isNaN(+amount),
    result: () => { throw errorObj(400, 'os campos userId e amount devem ser números'); },
  },
  {
    check: +amount <= 0,
    result: () => { throw errorObj(400, 'Valor deve ser maior que zero'); },
  },
  {
    check: +userId <= 0,
    result: () => { throw errorObj(400, 'userId deve ser maior que zero'); },
  },
]);

const checkStockTransition = ({ userId, stockId, quantity }) => ([
  {
    check: !userId || !stockId || !quantity,
    result: () => { throw errorObj(400, 'Os dados são obrigatórios e não podem ser igual a 0'); },
  },
  {
    check: Number.isNaN(userId) || Number.isNaN(stockId) || Number.isNaN(quantity),
    result: () => { throw errorObj(400, 'os campos userId, stockId e quantity devem ser números'); },
  },
  {
    check: +quantity <= 0,
    result: () => { throw errorObj(400, 'Quantidade deve ser maior que zero'); },
  },
  {
    check: +userId <= 0,
    result: () => { throw errorObj(400, 'userId deve ser maior que zero'); },
  },
  {
    check: +stockId <= 0,
    result: () => { throw errorObj(400, 'stockId deve ser maior que zero'); },
  },
]);

module.exports = {
  checkPostUser,
  checkbankTransition,
  checkStockTransition,
};
