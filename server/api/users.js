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

module.exports = router;
