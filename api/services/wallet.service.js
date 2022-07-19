const walletModel = require('../models/wallet.model');

const getUserStockById = async (payload) => {
  const { userId, stockId } = payload;
  const userStock = await walletModel.getUserStockById(userId, stockId);
  return userStock;
};

const getUserWallet = async (payload) => {
  const { userId } = payload;
  const userWallet = await walletModel.getUserWallet(userId);
  return userWallet;
};

module.exports = {
  getUserStockById,
  getUserWallet,
};
