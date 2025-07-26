const express = require('express')
const app = express()
const port = 3000
const { sequelize, User } = require('./database.js');
const userRouter = require('./router/userRouter.js')
app.use(express.json())

app.use('/api/users', userRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
