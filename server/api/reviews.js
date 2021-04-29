const express = require("express");
const router = express.Router();

const {
    syncAndSeed,
    model: { Products, Artists, Categories, Users, Orders, Reviews },
} = require("../db");

// All Reviews
router.get("/", async (req, res, next) => {
    try {
        const reviews = await Reviews.findAll({
            include: [{ model: Products }, { model: Users }],
        });

        res.send(reviews);
    } catch (err) {
        next(err);
    }
});

// Single Review
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await Reviews.findOne({
            where: { id },
            include: [{ model: Products }, { model: Users }],
        });

        // If no user, 404
        if (!review) {
            const error = Error("Review not found");
            error.status = 404;
            throw error;
        }

        res.send(review);
    } catch (err) {
        next(err);
    }
});

// Adding a review
router.post("/", async (req, res, next) => {
    try {
        const { detail, productId, userId } = req.body;

        // Error handling for correct syntax
        if (!detail) {
            const error = Error("Reviews need a 'detail' property");
            error.status = 400;
            throw error;
        } else if (!productId || !userId) {
            const error = Error("Reviews need a productId and a userId");
            error.status = 400;
            throw error;
        }

        // Find associated product and user
        const product = await Products.findByPk(productId);
        const user = await Users.findByPk(userId);

        // Error handling if product or user don't exist
        if (!product && !user) {
            const error = Error("Both Product and User not found");
            error.status = 404;
            throw error;
        } else if (!product) {
            const error = Error("Product not found");
            error.status = 404;
            throw error;
        } else if (!user) {
            const error = Error("User not found");
            error.status = 404;
            throw error;
        }

        // Make a new review
        const newReview = await Reviews.create({
            detail,
            userId,
            productId,
        });

        res.status(201).send(newReview);
    } catch (err) {
        next(err);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params.id;

        // Reviews can only update detail. Must delete to reassign User or Product
        const { detail } = req.body;

        // Finds Review
        let review = await Reviews.findOne({ where: { id } });

        // If no user, 404
        if (!review) {
            const error = Error("Review not found");
            error.status = 404;
            throw error;
        }

        // If no detail, incorrect syntax
        if (!detail) {
            const error = Error("Review detail cannot be empty.");
            error.status = 400;
            throw error;
        }

        review.detail = detail;
        await review.save();

        // Save changes
        await user.save();

        // Finds user again with the same format as GET
        const updatedReview = await Reviews.findOne({
            where: { id },
            include: [{ model: Products }, { model: Users }],
        });

        res.status(200).send(updatedReview);
    } catch (err) {
        next(err);
    }
});

// Deletes a review
router.delete("/:id", (req, res, next) => {
    try {
        const { id } = req.params;
        const review = Users.findOne({ where: { id } });

        // If id did not correspond to a user, throw error
        if (!review) {
            const error = Error("Review not found");
            error.status = 404;
            throw error;
        }

        Reviews.destroy({
            where: { id },
        });

        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
