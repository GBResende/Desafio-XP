const walletModel = require('../models/wallet.model');

const getUserStockById = async (payload) => {
  const { userId, stockId } = payload;
  const userStock = await walletModel.getUserStockById(userId, stockId);
  return userStock;
};

const getUserWallet = async (userId) => {
  const userWallet = await walletModel.getUserWallet(userId);
  return userWallet;
};

module.exports = {
  getUserStockById,
  getUserWallet,
};
