const express = require("express");
const router = express.Router();

const {
    syncAndSeed,
    model: { Products, Artists, Categories, Users, Orders, Reviews },
} = require("../db");

router.post("/", async (req, res, next) => {
    try {
        res.send({ token: await Users.authenticate(req.body) });
    } catch (err) {
        next(err);
    }
});

router.get("/", async (req, res, next) => {
    try {
        res.send(await Users.findByToken(req.headers.authorization));
    } catch (ex) {
        next(err);
    }
});

module.exports = router;
