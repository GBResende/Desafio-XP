const express = require('express');

const stockService = require('../services/stocks.service');

const stocksRouter = express.Router();

stocksRouter.get('/ativos/:id', async (req, res) => {
  const orderStock = await stockService.getStockById(req.params);
  res.status(200).json(orderStock);
});

stocksRouter.get('/ativos', async (req, res) => {
  const stocks = await stockService.getAllStocks();
  res.status(200).json(stocks);
});

module.exports = stocksRouter;
