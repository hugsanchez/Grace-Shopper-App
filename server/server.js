const express = require("express");
const path = require("path");
const app = express();

// API Imports
const userAPI = require("./api/users");
const adminAPI = require("./api/admins");
const productsAPI = require("./api/products");
const ordersAPI = require("./api/orders");
const reviewsAPI = require("./api/reviews");

// Database
const {
    syncAndSeed,
    Products,
    Artists,
    Orders,
    Reviews,
    Categories,
} = require("./db");

app.use("/public", express.static(path.join(__dirname, "/public")));

// API Routes
app.use("/api/users", userAPI);
app.use("/api/admins", adminAPI);
app.use("/api/products", productsAPI);
app.use("/api/orders", ordersAPI);
app.use("/api/reviews", reviewsAPI);

app.get("/", async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    } catch (err) {
        next(err);
    }
});

const PORT = process.env.PORT || 3000;

const init = async () => {
    await syncAndSeed();
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });
};

init();
