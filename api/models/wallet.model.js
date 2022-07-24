const connection = require('../db/connection');

const getUserStockById = async (userId, stockId) => {
  const [[stock]] = await connection.query(
    `SELECT w.*,
    s.value
    FROM wallet as w
    INNER JOIN stocks as s
    ON w.stock_id = s.id
    WHERE w.user_id = ? AND w.stock_id = ? `,
    [userId, stockId],
  );
  return stock;
};

const getUserWallet = async (userId) => {
  const [wallet] = await connection.query(
    `SELECT w.*,
    s.value
    FROM wallet w
    INNER JOIN stocks s
    ON w.stock_id = s.id
    WHERE w.user_id = ?`,
    [userId],
  );
  return wallet;
};

const createUserStock = async (userId, stockId, quantity) => {
  const [stock] = await connection.query(
    'INSERT INTO wallet (user_id, stock_id, quantity) VALUES (?, ?, ?)',
    [userId, stockId, quantity],
  );
  return stock;
};

const increaseUserStock = async (userId, stockId, quantity) => {
  const [stock] = await connection.query(
    'UPDATE wallet SET quantity = quantity + ? WHERE user_id = ? AND stock_id = ?',
    [quantity, userId, stockId],
  );
  return stock;
};

const decreaseUserStock = async (userId, stockId, quantity) => {
  const [stock] = await connection.query(
    'UPDATE wallet SET quantity = quantity - ? WHERE user_id = ? AND stock_id = ?',
    [quantity, userId, stockId],
  );
  return stock;
};

const deleteUserStock = async (userId, stockId) => {
  const [stock] = await connection.query(
    'DELETE FROM wallet WHERE user_id = ? AND stock_id = ?',
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
