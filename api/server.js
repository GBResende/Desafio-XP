require('express-async-errors');
const swagger = require('swagger-ui-express');

const express = require('express');
const { errorMiddleware } = require('./middlewares/error.middleware');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/users', require('./routers/users'));
app.use('/stocks', require('./routers/stocks'));
app.use('/wallet', require('./routers/wallet'));
app.use('/login', require('./routers/login'));

app.use('/docs', swagger.serve, swagger.setup(require('../swagger')));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
