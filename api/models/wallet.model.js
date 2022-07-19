const connection = require('../db/connection');

const getUserStockById = async (userId, stockId) => {
  const [stock] = await connection.query(
    `SELECT w.*,
    s.value
    FROM stocks_xp.wallet as w
    INNER JOIN stocks_xp.stocks as s
    ON w.stock_id = s.id
    WHERE w.user_id = ? AND w.stock_id = ? `,
    [userId, stockId],
  );
  if (stock.length === 0) {
    return null;
  }
  return stock;
};

const getUserWallet = async (userId) => {
  const [wallet] = await connection.query(
    `SELECT stocks_xp.wallet.*,
    stocks_xp.stocks.value
    FROM stocks_xp.wallet w
    INNER JOIN stocks_xp.stocks s
    ON w.stock_id = s.id
    WHERE w.user_id = ?`,
    [userId],
  );
  return wallet;
};

const createUserStock = async (userId, stockId, quantity) => {
  const [stock] = await connection.query(
    'INSERT INTO stocks_xp.wallet (user_id, stock_id, quantity) VALUES (?, ?, ?)',
    [userId, stockId, quantity],
  );
  return stock;
};

const increaseUserStock = async (userId, stockId, quantity) => {
  const [stock] = await connection.query(
    'UPDATE stocks_xp.wallet SET quantity = quantity + ? WHERE user_id = ? AND stock_id = ?',
    [quantity, userId, stockId],
  );
  return stock;
};

const decreaseUserStock = async (userId, stockId, quantity) => {
  const [stock] = await connection.query(
    'UPDATE stocks_xp.wallet SET quantity = quantity - ? WHERE user_id = ? AND stock_id = ?',
    [quantity, userId, stockId],
  );
  return stock;
};

const deleteUserStock = async (userId, stockId) => {
  const [stock] = await connection.query(
    'DELETE FROM stocks_xp.wallet WHERE user_id = ? AND stock_id = ?',
    [userId, stockId],
  );
  return stock;
};

module.exports = {
  getUserStockById,
  createUserStock,
  increaseUserStock,
  decreaseUserStock,
  getUserWallet,
  deleteUserStock,
};
