const { Sequelize, DataTypes } = require("sequelize");

// DB Imports
const db = require("../db");

const Reviews = db.define("reviews", {
    detail: {
        type: DataTypes.TEXT,
    },
});

module.exports = Reviews;
