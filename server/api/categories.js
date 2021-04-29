const express = require("express");
const router = express.Router();

// Error Imports
const { notFound, badSyntax, conflict } = require("./errors");

// DB Imports
const {
    syncAndSeed,
    db,
    model: { Products, Artists, Categories, Users, Orders, Reviews },
} = require("../db");

// All Users
router.get("/", async (req, res, next) => {
    try {
        const categories = await Categories.findAll({ includes: [Products] });
        res.send(categories);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
