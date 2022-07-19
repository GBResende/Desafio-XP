const express = require('express');

const walletService = require('../services/wallet.service');

const walletRouter = express.Router();

walletRouter.get('/ativos/:id', async (req, res) => {
  const wallet = await walletService.getUserWallet(req.params);
  res.status(200).json(wallet);
});

walletRouter.get('/ativos/:id/stock/:stockId', async (req, res) => {
  const wallet = await walletService.getUserStockById(req.params);
  res.status(200).json(wallet);
});

module.exports = walletRouter;
