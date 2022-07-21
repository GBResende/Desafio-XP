const connection = require('../db/connection');

const getUserById = async (id) => {
  const [[user]] = await connection.query(
    'SELECT * FROM stocks_xp.users WHERE id = ?',
    [id],
  );
  return user;
};

const getUserByCredentials = async (email, password) => {
  const [[user]] = await connection.query(
    'SELECT id, username, email, balance FROM stocks_xp.users WHERE email = ? AND password = ? ',
    [email, password],
  );
  return user;
};

const postUser = async (username, email, password) => {
  const [newUser] = await connection.query(
    'INSERT INTO stocks_xp.users (username, email, password, balance) VALUES (?, ?, ?, ?)',
    [username, email, password, 0],
  );
  return newUser;
};

const witdrawUserBalance = async (userId, amount) => {
  const [user] = await connection.query(
    'UPDATE stocks_xp.users SET balance = balance - ? WHERE id = ?',
    [amount, userId],
  );
  return user;
};

const depositUserBalance = async (userId, amount) => {
  const [user] = await connection.query(
    'UPDATE stocks_xp.users SET balance = balance + ? WHERE id = ?',
    [amount, userId],
  );
  return user;
};

const userBuyStock = async (userId, stockId, quantity, operation) => {
  const orderStock = await connection.query(
    'INSERT INTO stocks_xp.user_ops (user_id, stock_id, quantity, operation) VALUES (?, ?, ?, ?)',
    [userId, stockId, quantity, operation],
  );
  return orderStock;
};

const userSellStock = async (userId, stockId, quantity, operation) => {
  const orderStock = await connection.query(
    'INSERT INTO stocks_xp.user_ops (user_id, stock_id, quantity, operation) VALUES (?, ?, ?, ?)',
    [userId, stockId, quantity, operation],
  );
  return orderStock;
};

module.exports = {
  getUserById,
  userBuyStock,
  userSellStock,
  postUser,
  witdrawUserBalance,
  depositUserBalance,
  getUserByCredentials,
};
