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

module.exports = router;
