const { Router } = require('express');

const stocksRouter = require('../controllers/stocks.controller');

const router = Router();

router.use('/', stocksRouter);

module.exports = router;
