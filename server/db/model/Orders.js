const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Orders = db.define('order', {});

module.exports = Orders;
