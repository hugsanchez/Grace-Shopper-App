const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Reviews = db.define('reviews', {
    detail: {
        type: DataTypes.TEXT,
    },
});

module.exports = Reviews;
