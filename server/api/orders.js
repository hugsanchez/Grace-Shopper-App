const express = require("express");
const router = express.Router();

// Errors
const { notFound, badSyntax } = require("./errors");

const {
    syncAndSeed,
    model: {
        Products,
        Artists,
        Categories,
        Users,
        Orders,
        Reviews,
        ProductsOrders,
    },
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
        // API {
        //     products: [ { id: #, quantity: # }, { id: another #, quantity: # }, ...],
        //     userId: #,
        // }
        const { products, userId } = req.body;

        // Error handling
        if (!products.length) {
            throw badSyntax("Orders must have at least one product");
        }
        if (!userId) throw badSyntax("Orders must have an associated user");

        // Create the order and initialize product orders
        const newOrder = Orders.create({ userId });
        let productOrders = [];

        // Loop through products to create product orders
        for (const { id, quantity } of products) {
            const product = await Products.findById(id);

            // If no product, destroy the order and tell user why it failed
            if (!product) {
                await Orders.destroy({ where: { id: newOrder.id } });
                throw notFound(`Product with id #${id} not found`);
            }

            // Same with quantity
            if (!quantity) {
                await Orders.destroy({ where: { id: newOrder.id } });
                throw badSyntax(
                    `Client did not supply quantity of product #${id}`,
                );
            }

            // Push this to our product-orders array
            productOrders.push({
                productId: id,
                orderId: newOrder.id,
                quantity,
            });
        }

        // If we've made it this far, we can create the product orders
        await Promise.all(
            productOrders.map((productOrder) => {
                ProductsOrders.create({ ...productOrder });
            }),
        );

        // Send the new order
        res.status(201).send(newOrder);
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
