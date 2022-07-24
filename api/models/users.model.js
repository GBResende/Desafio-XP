const connection = require('../db/connection');

const getUserById = async (id) => {
  const [[user]] = await connection.execute(
    'SELECT * FROM stocks_xp.users WHERE id = ?',
    [id],
  );
  return user;
};

const getUserAccount = async (userId) => {
  const [[userAccount]] = await connection.execute(
    'SELECT id, name, email, balance, createdAt FROM stocks_xp.users WHERE id = ?',
    [userId],
  );
  return userAccount;
};

const getUserByCredentials = async (email, password) => {
  const [[user]] = await connection.execute(
    'SELECT id, name, email FROM stocks_xp.users WHERE email = ? AND password = ? ',
    [email, password],
  );
  return user;
};

const postUser = async (name, email, password) => {
  await connection.execute(
    'INSERT INTO stocks_xp.users (name, email, password, balance) VALUES (?, ?, ?, ?)',
    [name, email, password, 0],
  );
};

const witdrawUserBalance = async (userId, amount) => {
  await connection.execute(
    'UPDATE stocks_xp.users SET balance = balance - ? WHERE id = ?',
    [amount, userId],
  );
};

const depositUserBalance = async (userId, amount) => {
  await connection.execute(
    'UPDATE stocks_xp.users SET balance = balance + ? WHERE id = ?',
    [amount, userId],
  );
};

const userBuyStock = async (userId, stockId, quantity, operation) => {
  await connection.execute(
    'INSERT INTO stocks_xp.user_ops (user_id, stock_id, quantity, operation) VALUES (?, ?, ?, ?)',
    [userId, stockId, quantity, operation],
  );
};

const userSellStock = async (userId, stockId, quantity, operation) => {
  await connection.execute(
    'INSERT INTO stocks_xp.user_ops (user_id, stock_id, quantity, operation) VALUES (?, ?, ?, ?)',
    [userId, stockId, quantity, operation],
  );
};

module.exports = {
  getUserById,
  userBuyStock,
  userSellStock,
  postUser,
  witdrawUserBalance,
  depositUserBalance,
  getUserByCredentials,
  getUserAccount,
};
