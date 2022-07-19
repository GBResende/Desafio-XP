const stocksModel = require('../models/stocks.model');

const getStockById = async (stockId) => {
  const stock = await stocksModel.getStockById(stockId);
  return stock;
};

const getAllStocks = async () => {
  const stocks = await stocksModel.getAllStocks();
  return stocks;
};

module.exports = {
  getStockById,
  getAllStocks,
};
