const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/users', require('./routers/users'));
app.use('/stocks', require('./routers/stocks'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
