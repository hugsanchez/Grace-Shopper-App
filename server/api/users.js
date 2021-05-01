const express = require("express");
const router = express.Router();

// Errors
const { notFound, badSyntax, conflict } = require("./errors");

const {
    syncAndSeed,
    db,
    model: { Products, Artists, Categories, Users, Orders, Reviews },
} = require("../db");

// All Users
router.get("/", async (req, res, next) => {
    try {
        const users = await Users.findAllIncludes();
        res.send(users);
    } catch (err) {
        next(err);
    }
});

// Single User
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await Users.findOneIncludes(id);

        // If no user, 404
        if (!user) throw notFound("User not found");

        res.send(user);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { email, username, password } = req.body;

        if (!email) throw badSyntax("User needs an email property");
        if (!username) throw badSyntax("User needs a username property");
        if (!password) throw badSyntax("User needs a password property");

        const newUser = await Users.create({
            firstName: "Testing Data CHANGE ME",
            lastName: "Testing Data CHANGE ME",
            email,
            username,
            password,
            userType: "USER",
        });

        res.status(201).send(newUser);
    } catch (err) {
        const { errors } = err;
        if (errors) {
            // For each error
            errors.forEach((error) => {
                // Customize error message and status
                switch (error.type) {
                    case "unique violation":
                        next(conflict(error.message));
                }
            });
        }

        next(err);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        // User info update
        const { firstName, lastName, username, email } = req.body;

        // Finds user
        let user = await Users.findOne({ where: { id } });

        // If no user, 404
        if (!user) throw notFound("User not found");

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (username) user.username = username;
        if (email) user.email = email;

        // Save changes
        await user.save();

        // Finds user again with the same format as GET
        const updatedUser = await Users.findOneIncludes(id);

        res.status(200).send(updatedUser);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await Users.findOne({ where: { id } });

        // If id did not correspond to a user, throw error
        if (!user) throw notFound("User not found");

        await Users.destroy({
            where: { id },
        });

        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
