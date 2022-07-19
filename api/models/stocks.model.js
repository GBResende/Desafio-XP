const connection = require('../db/connection');

const decreaseStock = async (stockId, quantity) => {
  const [stock] = await connection.query(
    'UPDATE stocks_xp.stocks SET quantity = quantity - ? WHERE id = ?',
    [quantity, stockId],
  );
  return stock;
};

const increaseStock = async (stockId, quantity) => {
  const [stock] = await connection.query(
    'UPDATE stocks_xp.stocks SET quantity = quantity + ? WHERE id = ?',
    [quantity, stockId],
  );
  return stock;
};

const getStockById = async (stockId) => {
  const [[stock]] = await connection.query(
    'SELECT * FROM stocks_xp.stocks WHERE id = ?',
    [stockId],
  );
  return stock;
};

const getAllStocks = async () => {
  const [stocks] = await connection.query('SELECT * FROM stocks_xp.stocks');
  return stocks;
};

module.exports = {
  decreaseStock,
  increaseStock,
  getStockById,
  getAllStocks,
};
