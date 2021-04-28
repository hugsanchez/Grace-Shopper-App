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
            res.sendStatus(err.status);
        });
});

router.get("/", async (req, res, next) => {
    try {
        const user = await Users.findByToken(req.headers.authorization);

        res.send(user);
    } catch (ex) {
        next(err);
    }
});

module.exports = router;
