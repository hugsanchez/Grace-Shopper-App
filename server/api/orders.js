const express = require("express");
const router = express.Router();

const {
    syncAndSeed,
    Users,
    Products,
    Artists,
    Orders,
    Reviews,
    Categories,
} = require("../db");

// All Orders
router.get("/", async (req, res, next) => {
    try {
        const orders = await Orders.findAll();
        res.send(orders);
    } catch (err) {
        next(err);
    }
});

// Single Order
router.get("/:id", async (req, res, next) => {
    try {
        const order = await Orders.findOne({
            where: { id: req.params.id },
        });
        res.send(order);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
