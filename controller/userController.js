const { User } = require('../model/user.js');

async function getUser(req, res){
    const id = parseInt(req.params.id);
    const user = await User.findAll({
        where: {
            id: id
        }
    })

    if (!user) {
        return res.status(404).json({"message": `Connot find user with id ${id} `});
    }

    return res.json(user);
}

async function getUsers(req, res){
    const users = await User.findAll();

    return res.json(users)
}


async function registerUser(req, res) {
    const {name, email} = req.body;
    
    if (name == null || email == null) {
    return res.status(404).json(
        {
        "Code": "No name or email", 
        "name" : name, 
        "email":email
        }
    )
    }

    const alreadyuser = await User.findAll({
    where: {
        name: name,
        email: email
    }
    })


    if (alreadyuser != null) {
        return res.status(400).send("User is already register")
    }


    try {
    const newuser = await User.create({
        id: id,
        name: name,
        email: email
    })

    if (!newuser) {
        return res.status(404).send("Fail to register user");
    }
    } catch (err) {
        return res.status(404).send("Fail to register user");
    }

    return res.send("Success")
}

async function deleteUser(req, res) {
    const id = req.params.id;
    
    if (id == null) {
        return res.status(404).send("No id")
    }

    const alreadyuser = User.findAll({
    where: {
        id: id
    }
    })

    if (alreadyuser == null) {
        return res.status(400).send("User not in table")
    }

    try {
        const deleteuser = User.destroy({
            where: {
            id: id
            }
        });

        if (!deleteuser) {
            return res.status(404).send("Fail to delete user");
        }
    } catch (err) {
        return res.status(404).send("Fail to delete user");
    }

    return res.send("Success")
}

module.exports = {
    getUser,
    getUsers,
    registerUser,
    deleteUser
};