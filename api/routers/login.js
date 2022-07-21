const { Router } = require('express');

const loginRouter = require('../controllers/login.controller');

const router = Router();

router.use('/', loginRouter);

module.exports = router;
