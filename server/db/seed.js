const db = require("./db");
const {
    model: { Products, Artists, Categories, Users, Orders, Reviews },
} = require("./model");

const syncAndSeed = async () => {
    try {
        await db.authenticate();
        console.log("database connected");
        await db.sync({ force: true });

        const categories = await Promise.all([
            Categories.create({
                name: "Classical",
            }),
        ]);

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
            Users.create({
                firstName: "Anthony",
                lastName: "Sgro",
                email: "as@gmail.com",
                username: "asgro",
                password: "123abc!",
                userType: "ADMIN",
            }),
        ]);

        const artists = await Promise.all([
            Artists.create({
                name: "Leonardo Da Vinci",
            }),
        ]);

        const orders = await Promise.all([
            Orders.create({
                userId: 1,
                productId: 1,
            }),
        ]);

        const review = await Promise.all([
            Reviews.create({
                detail: "I loved the Mona Lisa, 10/10 would go again!",
                userId: 1,
                productId: 1,
            }),
        ]);

        const [monaLisa] = products;
        const [craig] = users;
        const [leonardoDaVinci] = artists;
        const [classical] = categories;

        monaLisa.categoryId = classical.id;

        await Promise.all([monaLisa.save()]);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { syncAndSeed };
