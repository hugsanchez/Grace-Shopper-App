const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Users = db.define("users", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 30],
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [8, 128],
        },
    },
    userType: {
        type: DataTypes.STRING,
        defaultValue: "GUEST",
        allowNull: false,
        validate: {
            isIn: [["GUEST", "USER", "ADMIN"]],
        },
    },
    isAdmin: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.userType === "ADMIN" ? true : false;
        },
    },
});

Users.isAdmin;

module.exports = Users;
