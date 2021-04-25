const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Orders = db.define("orders", {});

module.exports = Orders;
