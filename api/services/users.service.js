const { errorObj } = require('../middlewares/error.middleware');
const usersModel = require('../models/users.model');
const stocksModel = require('../models/stocks.model');
const walletModel = require('../models/wallet.model');

const getUserById = async (payload) => {
  const { id } = payload;
  const user = await usersModel.getUserById(id);
  if (!user) {
    throw errorObj(404, 'Usuário não encontrado');
  }
  const userInfos = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  return userInfos;
};

const getUserAccount = async (payload) => {
  const { id } = payload;
  const userAccount = await usersModel.getUserAccount(id);
  if (!userAccount) {
    throw errorObj(404, 'Usuário não encontrado');
  }
  return userAccount;
};

const postUser = async (payload) => {
  const { name, email, password } = payload;
  await usersModel.postUser(name, email, password);
};

const witdrawUserBalance = async (payload) => {
  const { userId, amount } = payload;
  const usuario = await usersModel.getUserById(userId);
  if (usuario.balance < amount) {
    throw errorObj(400, 'Você não tem saldo suficiente');
  }
  const user = await usersModel.witdrawUserBalance(userId, amount);
  return user;
};

const depositUserBalance = async (payload) => {
  const { userId, amount } = payload;
  const user = await usersModel.depositUserBalance(userId, amount);
  return user;
};

const userBuyStock = async (payload) => {
  const { userId, stockId, quantity } = payload;
  const buyOperation = true;
  const userHasStock = await walletModel.getUserStockById(userId, stockId);
  const user = await usersModel.getUserById(userId);
  if (!user) {
    throw errorObj(400, 'Usuário não encontrado');
  }
  const stock = await stocksModel.getStockById(stockId);
  if (user.balance < (stock.value * quantity)) {
    throw errorObj(400, 'Você não tem saldo suficiente');
  }
  if (stock.quantity < quantity) {
    throw errorObj(400, 'Não existem ações suficientes');
  }
  if (!userHasStock) {
    await walletModel.createUserStock(userId, stockId, quantity);
  } else {
    await walletModel.increaseUserStock(userId, stockId, quantity);
  }
  await usersModel.userBuyStock(userId, stockId, quantity, buyOperation);
  await usersModel.witdrawUserBalance(userId, (stock.value * quantity));
  await stocksModel.decreaseStock(stockId, quantity);
};

const userSellStock = async (payload) => {
  const { userId, stockId, quantity } = payload;
  const sellOperation = false;
  const userHasStock = await walletModel.getUserStockById(userId, stockId);
  const stock = await stocksModel.getStockById(stockId);
  const user = await usersModel.getUserById(userId);
  if (!user) {
    throw errorObj(400, 'Usuário não encontrado');
  }
  if (!userHasStock) {
    throw errorObj(400, 'Você não possui essa ação');
  }
  if (quantity > userHasStock.quantity) {
    throw errorObj(400, 'Você só pode vender quantidade menor ou igual a sua');
  }
  await usersModel.userSellStock(userId, stockId, quantity, sellOperation);
  await usersModel.depositUserBalance(userId, (stock.value * quantity).toFixed(2));
  await walletModel.decreaseUserStock(userId, stockId, quantity);
  if (userHasStock.quantity <= quantity) {
    await walletModel.deleteUserStock(userId, stockId);
  }
  await stocksModel.increaseStock(stockId, quantity);
};

module.exports = {
  getUserById,
  postUser,
  witdrawUserBalance,
  depositUserBalance,
  userBuyStock,
  userSellStock,
};
