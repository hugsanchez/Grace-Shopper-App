const { Sequelize, DataTypes } = require("sequelize");

// Database Imports
const db = require("../db");
const Users = require("./Users");

const Orders = db.define("orders", {});

module.exports = Orders;
