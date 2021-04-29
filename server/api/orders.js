const express = require("express");
const router = express.Router();

// Errors
const { notFound, badSyntax } = require("./errors");

const {
    syncAndSeed,
    model: { Products, Artists, Categories, Users, Orders, Reviews },
} = require("../db");

// All Orders
router.get("/", async (req, res, next) => {
    try {
        const orders = await Orders.findAll({
            include: [
                Users,
                { model: Products, include: [Artists, Categories] },
            ],
        });

        res.send(orders);
    } catch (err) {
        next(err);
    }
});

// Single Order
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Orders.findOne({
            where: { id },
            include: [
                Users,
                { model: Products, include: [Artists, Categories] },
            ],
        });

        if (!order) throw notFound("Product not found");

        res.send(order);
    } catch (err) {
        next(err);
    }
});

// Create Order
router.post("/", async (req, res, next) => {
    try {
    } catch (err) {
        next(err);
    }
});

//add single product to cart
router.put("/cart/:id", async (req, res, next) => {
    try {
        const currProduct = await Products.findByPk(req.params.id);
        // await currProduct.update({stock: stock-1})
        // make sure to update the current quantity so that multiple users cant buy the same item if it is in someone else's cart
        console.log("add this to cart", currProduct);
        res.send(currProduct);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
