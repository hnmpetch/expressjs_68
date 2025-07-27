const {DataTypes} = require('sequelize');
const {sequelize} = require('../database.js');


const Product = sequelize.define("product", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expire_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    create_at: {
        type: DataTypes.TIME,
        allowNull: false
    },
    update_at: {
        type: DataTypes.TIME,
        allowNull: false
    }

}, {
    tableName: "product",
    timestamps: false
})


module.exports = {
    Product
}