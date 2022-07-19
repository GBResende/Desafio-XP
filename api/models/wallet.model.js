const connection = require('../db/connection');

const getUserStockById = (userId, stockId) => {
  const [stock] = connection.query(
    'SELECT * FROM stocks_xp.wallet WHERE user_id = ? AND stock_id = ?',
    [userId, stockId],
  );
  return stock;
};

const getUserWallet = (userId) => {
  const [wallet] = connection.query(
    'SELECT * FROM stocks_xp.wallet WHERE user_id = ?',
    [userId],
  );
  return wallet;
};

const createUserStock = (userId, stockId, quantity) => {
  const [stock] = connection.query(
    'INSERT INTO stocks_xp.wallet (user_id, stock_id, quantity) VALUES (?, ?, ?)',
    [userId, stockId, quantity],
  );
  return stock;
};

const increaseUserStock = (userId, stockId, quantity) => {
  const [stock] = connection.query(
    'UPDATE stocks_xp.wallet SET quantity = quantity + ? WHERE user_id = ? AND stock_id = ?',
    [quantity, userId, stockId],
  );
  return stock;
};

const decreaseUserStock = (userId, stockId, quantity) => {
  const [stock] = connection.query(
    'UPDATE stocks_xp.wallet SET quantity = quantity - ? WHERE user_id = ? AND stock_id = ?',
    [quantity, userId, stockId],
  );
  return stock;
};

module.exports = {
  getUserStockById,
  createUserStock,
  increaseUserStock,
  decreaseUserStock,
  getUserWallet,
};
