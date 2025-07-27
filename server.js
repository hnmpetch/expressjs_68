const express = require('express');
const app = express();
const port = 3000;
const { sequelize } = require('./database.js');
const userRouter = require('./router/userRouter.js');
const productRouter = require('./router/productRouter.js');
app.use(express.json())

app.use('/api/users', userRouter);
app.use('/api/product', productRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
