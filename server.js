const express = require('express')
const app = express()
const port = 3000
const { sequelize, User } = require('./database.js');

app.get('/', (req, res) => {
  res.send('Hello World!2')
})

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
