const express = require('express');
const { validateRequest } = require('../middlewares/request.middleware');

const walletService = require('../services/wallet.service');

const walletRouter = express.Router();

walletRouter.get('/ativos/:id', validateRequest, async (req, res) => {
  const wallet = await walletService.getUserWallet(req.params);
  res.status(200).json(wallet);
});

walletRouter.get('/ativos/:id/stock/:stockId', validateRequest, async (req, res) => {
  const wallet = await walletService.getUserStockById(req.params);
  res.status(200).json(wallet);
});

module.exports = walletRouter;
