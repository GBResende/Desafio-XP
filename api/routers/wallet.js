const express = require('express');
const walletRouter = require('../controllers/wallet.controller');

const router = express.Router();

router.post('/', walletRouter);

module.exports = router;
