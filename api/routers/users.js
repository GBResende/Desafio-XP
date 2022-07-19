const { Router } = require('express');
const userRouter = require('../controllers/users.controller');

const router = Router();

router.use('/', userRouter);

module.exports = router;
