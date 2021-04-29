const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const ProductsOrders = db.define("products_orders", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
});

module.exports = ProductsOrders;
