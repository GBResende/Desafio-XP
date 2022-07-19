const express = require('express');

const userService = require('../services/users.service');

const userRouter = express.Router();

userRouter.get('/user/:id', async (req, res) => {
  const user = await userService.getUserById(req.query);
  res.status(200).json(user);
});

userRouter.post('/user', async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
});

userRouter.put('/conta/saque', async (req, res) => {
  const user = await userService.witdrawUserBalance(req.body);
  res.status(200).json(user);
});

userRouter.put('/conta/deposito', async (req, res) => {
  const user = await userService.depositUserBalance(req.body);
  res.status(200).json(user);
});

userRouter.post('/investimentos/comprar', async (req, res) => {
  userService.userBuyStock(req.body);
  res.status(201).json('Compra realizada com sucesso!');
});

userRouter.post('/investimentos/vender', async (req, res) => {
  userService.userSellStock(req.body);
  res.status(201).json('Venda realizada com sucesso!, o valor já consta na sua conta!');
});
