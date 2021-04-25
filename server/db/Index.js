const db = require("./db");
const {
    model: { Products, Artists, Categories, Users, Orders, Reviews },
} = require("./model");
const { syncAndSeed } = require("./seed");

module.exports = {
    syncAndSeed,
    model: { Products, Artists, Categories, Users, Orders, Reviews },
};
