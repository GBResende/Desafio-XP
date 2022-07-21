const { errorObj } = require('../middlewares/error.middleware');
const walletModel = require('../models/wallet.model');

const getUserStockById = async (payload) => {
  const { id, stockId } = payload;
  const userStock = await walletModel.getUserStockById(id, stockId);
  if (!userStock) {
    throw errorObj(400, 'O usuário não possui essa ação');
  }
  return userStock;
};

const getUserWallet = async (payload) => {
  const { id } = payload;
  const userWallet = await walletModel.getUserWallet(id);
  return userWallet;
};

module.exports = {
  getUserStockById,
  getUserWallet,
};
