const connection = require('../db/connection');

const decreaseStock = (stockId, quantity) => {
  const [stock] = connection.query(
    'UPDATE stocks SET quantity = quantity - ? WHERE id = ?',
    [quantity, stockId],
  );
  return stock;
};

const increaseStock = (stockId, quantity) => {
  const [stock] = connection.query(
    'UPDATE stocks SET quantity = quantity + ? WHERE id = ?',
    [quantity, stockId],
  );
  return stock;
};

const getStockById = (stockId) => {
  const [stock] = connection.query(
    'SELECT * FROM stocks WHERE id = ?',
    [stockId],
  );
  return stock;
};

const getAllStocks = () => {
  const [stocks] = connection.query('SELECT * FROM stocks');
  return stocks;
};

module.exports = {
  decreaseStock,
  increaseStock,
  getStockById,
  getAllStocks,
};
