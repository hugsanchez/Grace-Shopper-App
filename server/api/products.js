const express = require("express");
const router = express.Router();

// Errors
const { notFound, badSyntax, unauthorized } = require("./errors");

const {
    syncAndSeed,
    model: { Products, Artists, Categories, Users, Orders, Reviews },
} = require("../db");

// All Products
router.get("/", async (req, res, next) => {
    try {
        const products = await Products.findAll({
            include: [Artists, Categories, Reviews],
            order: [["name"]],
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
            include: [Artists, Categories, Reviews],
        });
        res.send(productsByCategory);
    } catch (err) {
        next(err);
    }
});

// Single Product
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Products.findOne({
            where: { id },
            include: [Artists, Categories, Reviews],
        });

        if (!product) throw notFound("Product not found");

        res.send(product);
    } catch (err) {
        next(err);
    }
});

// Create Product
// Adding a review
router.post("/", async (req, res, next) => {
    try {
        const {
            name,
            description,
            price,
            year,
            imgUrl,
            artistId,
            categoryId,
        } = req.body;

        const props = [
            name,
            description,
            price,
            year,
            imgUrl,
            artistId,
            categoryId,
        ];

        // Error handling for correct request body syntax
        for (let prop of props) {
            if (!prop)
                throw badSyntax(
                    "New products must have all of the following properties: name, description, price, year, imgUrl, artistId, categoryId",
                );
        }

        // Find associated artist and category
        const artist = await Artists.findByPk(artistId);
        const category = await Categories.findByPk(categoryId);

        // Error handling if artist or category don't exist
        if (!artist && !category) {
            throw notFound("Artist and Category not found");
        }
        if (!artist) throw notFound("Artist not found");
        if (!category) throw notFound("Category not found");

        // Make a new review
        const newProduct = await Products.create({
            name,
            description,
            price,
            year,
            imgUrl,
            artistId,
            categoryId,
        });

        res.status(201).send(newProduct);
    } catch (err) {
        next(err);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        // User info update
        const {
            name,
            description,
            price,
            year,
            imgUrl,
            artistId,
            categoryId,
        } = req.body;

        // Finds product
        let product = await Products.findOne({ where: { id } });

        // If no product, 404
        if (!product) throw notFound("Product not found");

        // Find associated artist and set it
        if (artistId) {
            const artist = await Artists.findByPk(artistId);
            if (!artist) throw notFound("Artist not found");

            await product.setArtist(artist);
        }

        // Find associated category and set it
        if (categoryId) {
            const category = await Categories.findByPk(categoryId);
            if (!category) throw notFound("Category not found");

            await product.setCategory(category);
        }

        // Update values
        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (year) product.year = year;
        if (imgUrl) product.imgUrl = imgUrl;

        // Save changes
        await product.save();

        // Finds product again with the same format as GET
        const updatedProduct = await Products.findOne({
            where: { id },
            include: [Artists, Categories, Reviews],
        });

        res.status(200).send(updatedProduct);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization;

        // Need to send a token to use this route
        if (!token) throw unauthorized("Invalid credentials");

        // Finds user who made request
        const requestor = await Users.findByToken(token);

        // If no requestor, 401
        if (!requestor) throw unauthorized("Invalid credentials");

        // If user is not an admin, 401 error
        if (requestor.userType !== "ADMIN") {
            throw unauthorized("Invalid credentials");
        }

        const product = await Products.findOne({ where: { id } });

        // If id did not correspond to a product, throw error
        if (!product) throw notFound("Product not found");

        await Products.destroy({
            where: { id },
        });

        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
