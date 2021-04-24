const db = require("./db");
const Products = require("./Products");
const Artists = require("./Artists");
const Categories = require("./Categories");
const Users = require("./Users");
const Orders = require("./Orders");
const Reviews = require("./Reviews");

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

const syncAndSeed = async () => {
  try {
    await db.authenticate();
    console.log("database connected");
    await db.sync({ force: true });
    const products = await Promise.all([
      Products.create({
        name: "Mona Lisa",
        description: "art",
        price: 100000.0,
        year: 1900,
        imgURL: "#",
      }),
    ]);

    const users = await Promise.all([
      Users.create({
        firstName: "Craig",
        lastName: "Ferreira",
        email: "cf@gmail.com",
        username: "cferreira",
        password: "123",
      }),
    ]);

    const artists = await Promise.all([
      Artists.create({
        name: "Leonardo Da Vinci",
      }),
    ]);

    const categories = await Promise.all([
      Categories.create({
        name: "Classical",
      }),
    ]);

    const [monaLisa] = products;
    const [craig] = users;
    const [leonardoDaVinci] = artists;
    const [classical] = categories;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  syncAndSeed,
  Products,
  Artists,
};
