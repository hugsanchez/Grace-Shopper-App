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

        if (!order) throw notFound("Order not found");

        res.send(order);
    } catch (err) {
        next(err);
    }
});

// Create Order
router.post("/", async (req, res, next) => {
    try {
        // API
        // Products: [ { id: #, quantity: # }, { id: another #, quantity: # }, ...]
        const { products, userId } = req.body;

        if (!products.length) {
            throw badSyntax("Orders must have at least one product");
        }
        if (!userId) throw badSyntax("Orders must have an associated user");

        // Loop through products
        products.forEach((product) => {
            const { id } = product;
            // const product = await Products.findById(id);
            if (!product) throw notFound(`Product with id #${id} not found`);

            const productOrderItem = {
                // productId:
            };
        });
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
