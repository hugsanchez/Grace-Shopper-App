const express = require("express");
const router = express.Router();

// Errors
const { notFound } = require("./errors");

const {
    syncAndSeed,
    model: { Products, Artists, Categories, Users, Orders, Reviews },
} = require("../db");

// All Products
router.get("/", async (req, res, next) => {
    try {
        const products = await Products.findAll({
            includes: [Artists, Categories, Reviews],
        });
        res.send(products);
    } catch (err) {
        next(err);
    }
});

// Product By Category
router.get("/category/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const productsByCategory = await Products.findAll({
            where: { categoryId: id },
            includes: [Artists, Categories, Reviews],
        });
        res.send(productsByCategory);
    } catch (err) {
        next(err);
    }
});

// Single Product
router.get("/:id", async (req, res, next) => {
    try {
        const product = await Products.findOne({
            where: { id: req.params.id },
            include: [Artists, Categories, Reviews],
        });

        if (!product) throw notFound("Review not found");

        res.send(product);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
