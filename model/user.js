const {DataTypes} = require('sequelize')
const {sequelize} = require('../database.js');

const User = sequelize.define("User", {
    id :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,   
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: "users",
    timestamps: false
});

module.exports = {
    User
}