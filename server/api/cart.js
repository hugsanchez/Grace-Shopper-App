const express = require("express");
const router = express.Router();

// Errors
const { notFound, badSyntax, conflict } = require("./errors");

const {
    syncAndSeed,
    db,
    model: { Products, Artists, Categories, Users, Orders, Reviews, Cart },
} = require("../db");

// All Users
router.post("/", async (req, res, next) => {
    try {
        const cart = await Cart.findAllIncludes();
        res.send(users);
    } catch (err) {
        next(err);
    }
});


module.exports = router;
