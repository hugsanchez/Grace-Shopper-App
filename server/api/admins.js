const express = require("express");
const router = express.Router();

const {
    syncAndSeed,
    model: {
        Products,
        Artists,
        Categories,
        Users,
        Orders,
        Reviews,
        ProductsCategories,
    },
} = require("../db");

const { notFound, unauthorized, conflict, badSyntax } = require("./errors");

// All Admins
router.get("/", async (req, res, next) => {
    try {
        const admins = await Users.findAll({
            where: { userType: "ADMIN" },
        });
        res.send(admins);
    } catch (err) {
        next(err);
    }
});

// Single Admin
router.get("/:id", async (req, res, next) => {
    try {
        const admin = await Users.findOne({
            where: { id: req.params.id, userType: "ADMIN" },
        });
        res.send(admin);
    } catch (err) {
        next(err);
    }
});

router.post("/users", async (req, res, next) => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization;

        // Need to send a token to use this route
        if (!token) throw unauthorized("Invalid credentials");

        // User info update
        const { firstName, lastName, username, email, userType } = req.body;

        const props = [firstName, lastName, username, email, userType];

        // Error handling for correct request body syntax
        for (let prop of props) {
            if (!prop)
                throw badSyntax(
                    "New Users must have all of the following properties: First Name, Last Name, username, Email, userType",
                );
        }

        // Finds user who made request
        const requestor = await Users.findByToken(token);

        // If no requestor, 401
        if (!requestor) throw unauthorized("Invalid credentials");

        // If user is not an admin, 401 error
        if (requestor.userType !== "ADMIN") {
            throw unauthorized("Invalid credentials");
        }

        const newUser = await Users.create({
            firstName,
            lastName,
            email,
            username,
            password: "default_",
            userType,
        });

        // Finds user again with the same format as GET
        const postedUser = await Users.findOneIncludes(newUser.id);

        res.status(201).send(postedUser);
    } catch (err) {
        const { errors } = err;
        if (errors) {
            // For each error
            errors.forEach((error) => {
                // Customize error message and status
                switch (error.type) {
                    case "unique violation":
                        next(conflict(error.message));
                }
            });
        }

        next(err);
    }
});

router.put("/users/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization;

        // Need to send a token to use this route
        if (!token) throw unauthorized("Invalid credentials");

        // User info update
        const { firstName, lastName, username, email, userType } = req.body;

        // Finds user who made request
        const requestor = await Users.findByToken(token);

        // If no requestor, 401
        if (!requestor) throw unauthorized("Invalid credentials");

        // If user is not an admin, 401 error
        if (requestor.userType !== "ADMIN") {
            throw unauthorized("Invalid credentials");
        }

        // Finds user to be edited
        let user = await Users.findOne({ where: { id } });

        // If user doesn't exist,
        if (!user) throw notFound("User not found");

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (username) user.username = username;
        if (email) user.email = email;
        if (userType) user.userType = userType;

        // Save changes
        await user.save();

        // Finds user again with the same format as GET
        const updatedUser = await Users.findOneIncludes(id);

        res.status(200).send(updatedUser);
    } catch (err) {
        next(err);
    }
});

router.post("/products", async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        // Need to send a token to use this route
        if (!token) throw unauthorized("Invalid credentials");

        // User info update
        const {
            name,
            description,
            price,
            year,
            stock,
            imgUrl,
            categories,
        } = req.body;

        const props = [name, description, price, year, stock];

        // Error handling for correct request body syntax
        for (let prop of props) {
            if (!prop)
                throw badSyntax(
                    "New products must have all of the following properties: Name, Description, Price, Year, and Stock",
                );
        }

        // Finds user who made request
        const requestor = await Users.findByToken(token);

        // If no requestor, 401
        if (!requestor) throw unauthorized("Invalid credentials");

        // If user is not an admin, 401 error
        if (requestor.userType !== "ADMIN") {
            throw unauthorized("Invalid credentials");
        }

        const newProduct = await Products.create({
            name,
            description,
            price,
            year,
            stock,
            imgUrl,
        });

        await newProduct.addCategories(categories.map((cat) => cat.id));
        await newProduct.save();

        // Finds user again with the same format as GET
        const postedProduct = await Products.findOne({
            where: { id: newProduct.id },
            include: [Artists, Categories, Reviews],
        });

        res.status(201).send(postedProduct);
    } catch (err) {
        const { errors } = err;
        if (errors) {
            // For each error
            errors.forEach((error) => {
                // Customize error message and status
                switch (error.type) {
                    case "unique violation":
                        next(conflict(error.message));
                }
            });
        }

        next(err);
    }
});

router.put("/products/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization;

        // Need to send a token to use this route
        if (!token) throw unauthorized("Invalid credentials");

        // Product info update
        const {
            name,
            description,
            price,
            year,
            stock,
            imgUrl,
            categories,
        } = req.body;

        // Finds user who made request
        const requestor = await Users.findByToken(token);

        // If no requestor, 401
        if (!requestor) throw unauthorized("Invalid credentials");

        // If user is not an admin, 401 error
        if (requestor.userType !== "ADMIN") {
            throw unauthorized("Invalid credentials");
        }

        // Finds user to be edited
        let product = await Products.findOne({ where: { id } });

        // If user doesn't exist,
        if (!product) throw notFound("Product not found");

        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (year) product.year = year;
        if (stock) product.stock = stock;
        if (imgUrl) product.imgUrl = imgUrl;

        // Destroy all category associations, we will rebuild
        await ProductsCategories.destroy({
            where: { productId: product.id },
        });

        await product.addCategories(categories.map((cat) => cat.id));

        // Save changes
        await product.save();

        // Finds user again with the same format as GET
        const updatedProduct = await Products.findOne({
            where: { id },
            include: [Artists, Categories, Reviews],
        });

        res.status(200).send(updatedProduct);
    } catch (err) {
        next(err);
    }
});
module.exports = router;
