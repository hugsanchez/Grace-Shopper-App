require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
    // JWT verifies token with ciphered version (using environment variable) and returns userId
    const { id } = jwt.verify(token, process.env.JWT);

    // Now we can get the User ID
    return await Users.findByPk(id)
        .then((user) => {
            if (user) return user;

            // If no user, client is trying to access a user that doesn't exist
            const error = Error("This user does not exist");
            error.status = 401;
            throw error;
        })
        .catch((err) => {
            throw err;
        });
};

// Authenticates a user with a username and password
Users.authenticate = async ({ username, password }) => {
    try {
        const user = await Users.findOne({
            where: {
                username,
            },
        });

        // if password matches, sign a token that contains the id to match later
        if (user && (await bcrypt.compare(password, user.password))) {
            return jwt.sign({ id: user.id }, process.env.JWT);
        } else {
            const error = Error("Bad credentials");
            error.status = 401;
            throw error;
        }
    } catch (err) {
        throw err;
    }
};

// Add hooks to hash passwords if we need to
Users.addHook("beforeSave", async (user) => {
    if (user.changed("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

module.exports = Users;
