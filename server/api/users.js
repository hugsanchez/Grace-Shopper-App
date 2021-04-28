const express = require("express");
const router = express.Router();

const {
    syncAndSeed,
    model: { Products, Artists, Categories, Users, Orders, Reviews },
} = require("../db");

// All Users
router.get("/", async (req, res, next) => {
    try {
        const users = await Users.findAll();
        res.send(users);
    } catch (err) {
        next(err);
    }
});

// Single User
router.get("/:id", async (req, res, next) => {
    try {
        const user = await Users.findByPk(req.params.id);
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
        console.error(err);
        next(err);
    }
});

module.exports = router;
