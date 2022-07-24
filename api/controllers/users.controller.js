const express = require('express');
const { validateRequest } = require('../middlewares/request.middleware');
const { validateUser, validateBankTransition, validateStockTransition } = require('../middlewares/user.middleware');

const userService = require('../services/users.service');

const userRouter = express.Router();

userRouter.get('/:id', validateRequest, async (req, res) => {
  const user = await userService.getUserById(req.params);
  res.status(200).json(user);
});

userRouter.get('/conta/:id', validateRequest, async (req, res) => {
  const user = await userService.getUserAccount(req.params);
  res.status(200).json(user);
});

userRouter.post('/', validateUser, async (req, res) => {
  await userService.postUser(req.body);
  res.status(201).json('Usuário criado com sucesso');
});

userRouter.post('/conta/saque', validateBankTransition, validateRequest, async (req, res) => {
  await userService.witdrawUserBalance(req.body);
  res.status(200).json('Saque realizado com sucesso!');
});

userRouter.post('/conta/deposito', validateBankTransition, async (req, res) => {
  await userService.depositUserBalance(req.body);
  res.status(200).json('Depósito realizado com sucesso!');
});

userRouter.post('/investimentos/comprar', validateStockTransition, validateRequest, async (req, res) => {
  await userService.userBuyStock(req.body);
  res.status(201).json('Compra realizada com sucesso!');
});

userRouter.post('/investimentos/vender', validateStockTransition, validateRequest, async (req, res) => {
  await userService.userSellStock(req.body);
  res.status(201).json('Venda realizada com sucesso!, o valor já consta na sua conta!');
});

module.exports = userRouter;
