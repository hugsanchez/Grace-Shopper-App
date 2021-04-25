const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Categories = db.define("categories", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
});

module.exports = Categories;
