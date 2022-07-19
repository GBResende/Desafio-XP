const stocksModel = require('../models/stocks.model');

const getStockById = async (payload) => {
  const { id } = payload;
  const stock = await stocksModel.getStockById(id);
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
