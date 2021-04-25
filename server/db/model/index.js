const Products = require("./Products");
const Artists = require("./Artists");
const Categories = require("./Categories");
const Users = require("./Users");
const Orders = require("./Orders");
const Reviews = require("./Reviews");

// ------ Associations ------
Users.hasMany(Orders);
Orders.belongsTo(Users);

Users.hasMany(Reviews);
Reviews.belongsTo(Users);

Artists.hasMany(Products);
Products.belongsTo(Artists);

Products.hasMany(Orders);
Orders.belongsTo(Products);

Products.hasMany(Reviews);
Reviews.belongsTo(Products);

Categories.hasMany(Products);
Products.belongsTo(Categories);
// --------------------------

module.exports = {
    model: { Products, Artists, Categories, Users, Orders, Reviews },
};
