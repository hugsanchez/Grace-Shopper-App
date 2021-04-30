const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const ProductsOrders = db.define("products_orders", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    productId: {
        type: DataTypes.INTEGER,
    },
    orderId: {
        type: DataTypes.INTEGER,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
});

module.exports = ProductsOrders;
