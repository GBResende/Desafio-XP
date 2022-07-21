const express = require('express');

const loginService = require('../services/login.service');

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
  const token = await loginService.postLogin(req.body);

  res.status(200).json({ token });
});

module.exports = loginRouter;
