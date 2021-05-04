const express = require("express");
const router = express.Router();

const {
    syncAndSeed,
    model: { Products, Artists, Categories, Users, Orders, Reviews },
} = require("../db");

router.post("/", async (req, res, next) => {
    const { username, password } = req.body;
    await Users.authenticate({ username, password })
        .then((token) => {
            res.status(201).send({ token });
        })
        .catch((err) => {
            next(err);
        });
});

router.get("/", async (req, res, next) => {
    await Users.findByToken(req.headers.authorization)
        .then((user) => {
            res.send(user);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
