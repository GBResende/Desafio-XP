const userByCredentials = [[{
  id: 1,
  name: 'teste',
  email: 'teste@teste.com',
}]];

const allInfoUser = [[{
  id: 1,
  name: 'teste',
  email: 'teste@teste.com',
  password: '12345678',
  balance: 0,
  createdAt: '2022-07-22 16:13:00',
}]];

const userLogin = {
  email: 'teste@teste.com',
  password: '12345678',
};

const userAccount = [[{
  id: 1,
  name: 'teste',
  email: 'teste@teste.com',
  balance: 100,
  createdAt: '2020-12-31 00:00:00',
}]];

const bankTransitionPayload = {
  userId: 1,
  amount: 100,
};

const stockTransitionPayload = {
  userId: 1,
  stockId: 1,
  quantity: 1,
};

const postUserPayload = {
  name: 'teste',
  email: 'teste@teste.com',
  password: '12345678',
};

const loginPayload = {
  email: 'teste@teste.com',
  password: '12345678',
};

module.exports = {
  userByCredentials,
  allInfoUser,
  userLogin,
  userAccount,
  bankTransitionPayload,
  stockTransitionPayload,
  postUserPayload,
  loginPayload,
};
