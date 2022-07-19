const usersModel = require('../models/users.model');
const stocksModel = require('../models/stocks.model');
const walletModel = require('../models/wallet.model');

const getUserById = async (id) => {
  const user = await usersModel.getUserById(id);
  return user;
};

const postUser = async (username, email, password) => {
  const hasUser = await getUserById(username);
  if (hasUser) {
    throw new Error('Usuário já existe');
  }
  await usersModel.postUser(username, email, password);
};

const witdrawUserBalance = async (userId, amount) => {
  const { balance } = await getUserById(userId);
  if (balance < amount) {
    throw new Error('Você não tem saldo suficiente');
  }
  const user = await usersModel.witdrawUserBalance(userId, amount);
  return user;
};

const depositUserBalance = async (userId, amount) => {
  const user = await usersModel.depositUserBalance(userId, amount);
  return user;
};

const userBuyStock = async (userId, stockId, quantity) => {
  const buyOperation = true;
  const userHasStock = await walletModel.getUserStockById(userId, stockId);
  const stock = await stocksModel.getStockById(stockId);
  if (stock.quantity < quantity) {
    throw new Error('Não existem ações suficientes');
  }
  if (!userHasStock) {
    await walletModel.createUserStock(userId, stockId, quantity);
  } else {
    await walletModel.increaseUserStock(userId, stockId, quantity);
  }
  await usersModel.userBuyStock(userId, stockId, quantity, buyOperation);
  await usersModel.witdrawUserBalance(userId, (stock.value * quantity).toFixed(2));
  await stocksModel.decreaseStock(stockId, quantity);
};

const userSellStock = async (userId, stockId, quantity) => {
  const sellOperation = false;
  const userHasStock = await walletModel.getUserStockById(userId, stockId);
  const stock = await stocksModel.getStockById(stockId);
  if (userHasStock.quantity < quantity) {
    throw new Error('Não existem ações suficientes');
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
