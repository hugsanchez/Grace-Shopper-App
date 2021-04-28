const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Reviews = db.define('review', {
    detail: {
        type: DataTypes.TEXT,
    },
});

module.exports = Reviews;
