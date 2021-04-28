require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Users = db.define('user', {
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

// Finds a user by token
Users.findByToken = async (token) => {
    try {
        // JWT verifies token with ciphered version (using environment variable) and returns userId
        const { id } = await jwt.verify(token, process.env.JWT);

        // Now we can get the User ID
        const user = await Users.findByPk(id);

        if (user) {
            return user;
        } else {
            // If no user, then throw an error
            const error = Error("This user does not exist");
            error.status = 401;
            throw error;
        }
    } catch (ex) {
        console.error(ex);
    }
};

// Authenticates a user with a username and password
Users.authenticate = async ({ username, password }) => {
    try {
        const user = await Users.findOne({
            where: {
                username,
            },
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            // if password matches, sign a token that contains the id to match later
            return jwt.sign({ id: user.id }, process.env.JWT);
        } else {
            const error = Error("Bad credentials");
            error.status = 401;
            throw error;
        }
    } catch (err) {
        console.error(err);
    }
};

// Add hooks to hash passwords if we need to
Users.addHook("beforeSave", async (user) => {
    if (user.changed("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

module.exports = Users;
