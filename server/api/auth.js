const express = require("express");
const router = express.Router();

const {
    syncAndSeed,
    model: { Products, Artists, Categories, Users, Orders, Reviews },
} = require("../db");

router.post("/", async (req, res, next) => {
    await Users.authenticate(req.body)
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
