const express = require('express')
const app = express()
const port = 3000
const { sequelize, User } = require('./database.js');



app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!2')
})

app.get('/users', async (req, res) => {
  const name = req.query.name;
  const email = req.query.email;

  if (name != null && email != null){
    const user = await User.findAll({
      where: {
        name: name,
        email: email
      }
    });  

    res.json(user);
  } else if(name != null) {
    const user = await User.findAll({
      where: {
        name: name
      }
    });
    res.json(user);

  } else if(email != null){
    const user = await User.findAll({
      where: {
        email: email
      }
    });
    
    res.json(user);
  } else {
    const user = await User.findAll();

    res.json(user);
  }

})

app.post('/register', async (req, res) => {
  const {name, email} = req.body;

  if (name == null || email == null) {
    res.status(404).json(
      {
        "Code": "No name or email", 
        "name" : name, 
        "email":email
      }
    )
  }

  const alreadyuser = User.findAll({
    where: {
      name: name,
      email: email
    }
  })


  if (alreadyuser != []) {
    res.status(400).send("User is already register")
  }


  try {
    const newuser = await User.create({
      id: id,
      name: name,
      email: email
    })

    if (!newuser) {
      res.status(404).send("Fail to register user");
    }
  } catch (err) {
    res.status(404).send("Fail to register user");
  }



  res.send("Success")
})

app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;

  if (id == null) {
    res.status(404).send("No id")
  }

  const alreadyuser = User.findAll({
    where: {
      id: id
    }
  })

  if (alreadyuser == null) {
    res.status(400).send("User not in table")
  }

  try {
    const deleteuser = User.destroy({
      where: {
        id: id
      }
    });

    if (!deleteuser) {
      res.status(404).send("Fail to delete user");
    }
  } catch (err) {
    res.status(404).send("Fail to delete user");
  }

  res.send("Success")
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
