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

// All Products
router.get("/", async (req, res, next) => {
    try {
        const products = await Products.findAll();
        res.send(products);
    } catch (err) {
        next(err);
    }
});

// Product By Category
router.get("/category/:id", async (req, res, next) => {
    try {
        const productsByCategory = await Products.findAll({
            where: { categoryId: req.params.id },
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
        });
        res.send(product);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
