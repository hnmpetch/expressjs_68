const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize("my_database", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

// check connect database
sequelize.authenticate()
.then(() => console.log("Connect Database."))
.catch(err => console.log("error while connect to database. error: ", err))


module.exports = {
    sequelize
}