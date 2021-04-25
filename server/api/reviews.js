const express = require("express");
const router = express.Router();

const {
    syncAndSeed,
    model: { Products, Artists, Categories, Users, Orders, Reviews },
} = require("../db");

// All Reviews
router.get("/", async (req, res, next) => {
    try {
        const reviews = await Reviews.findAll();
        res.send(reviews);
    } catch (err) {
        next(err);
    }
});

// Single Review
router.get("/:id", async (req, res, next) => {
    try {
        const review = await Reviews.findOne({
            where: { id: req.params.id },
        });
        res.send(review);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
