const express = require("express");
const router = express.Router();

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
        res.send(user);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { email, username, password } = req.body;

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
                // Make error
                const newError = Error();
                // Customize error message and status
                switch (error.type) {
                    case "unique violation":
                        newError.status = 409;
                        newError.message = error.message;
                }
                next(newError);
            });
        } else {
            next(err);
        }
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params.id;

        // User info update
        const { firstName, lastName, username, email } = req.body;

        // Finds user
        let user = await Users.findOne({ where: { id } });

        // If no user, 404
        if (!user) {
            const error = Error("User not found");
            error.status = 404;
            throw error;
        }

        if (firstName) user.firstName = firstName;
        if (lastName) user.firstName = lastName;
        if (username) user.firstName = username;
        if (email) user.firstName = email;

        // Save changes
        await user.save();

        // Finds user again with the same format as GET
        const updatedUser = await Users.findOneIncludes(id);

        res.status(200).send(updatedUser);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", (req, res, next) => {
    try {
        const { id } = req.params;
        const user = Users.findOne({ where: { id } });

        // If id did not correspond to a user, throw error
        if (!user) {
            const error = Error("User not found");
            error.status = 404;
            throw error;
        }

        Users.destroy({
            where: { id },
        });

        res.sendState(204);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
