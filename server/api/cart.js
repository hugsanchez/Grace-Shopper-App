const express = require("express");
const router = express.Router();

// Errors
const { notFound, badSyntax, conflict } = require("./errors");

const {
  syncAndSeed,
  db,
  model: { Products, Artists, Categories, Users, Orders, Reviews, Cart },
} = require("../db");

// All Users
router.post("/", async (req, res, next) => {
  try {
    const doesProductExist = await Cart.findAll({
      where: {
        productId: req.body.product.id,
      },
    });
    if (doesProductExist.length > 0) {
      await Cart.increment("quantity", {
        by: 1,
        where: { productId: req.body.product.id },
      });
    } else {
      const cart = await Cart.create({
        userId: req.body.userId,
        productId: req.body.product.id,
        price: req.body.product.price,
      });
    }
    //res.send(cart.dataValues);
  } catch (err) {
    next(err);
  }
});

router.get("/productsInCart/:id", async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: {
        userId: req.params.id,
      },
    });
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
