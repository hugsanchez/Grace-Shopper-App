const db = require("./db");
const {
    model: { Products, Artists, Categories, Users, Orders, Reviews },
} = require("./model");
const faker = require("faker");

const syncAndSeed = async () => {
    try {
        await db.authenticate();
        console.log("Database Connected");

        await db.sync({ force: true });

        // Generate Fake Users (not admins!)
        let fakeUsers = [];
        const NUMBER_OF_USERS = 10;
        for (let i = 1; i <= NUMBER_OF_USERS; i++) {
            // Create fake user details
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            const email = faker.internet.email();
            const username = faker.internet.userName();
            const password = faker.internet.password();

            fakeUsers.push({
                firstName,
                lastName,
                email,
                username,
                password,
            });

            // console.log(`${i} users generated`);
        }

        // Generate Fake Products
        let fakeProducts = [];
        const NUMBER_OF_PRODUCTS = 10;
        for (let i = 1; i <= NUMBER_OF_PRODUCTS; i++) {
            // Create fake product details
            // console.log(`${i} users generated`);
        }

        // Custom Users
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

        // Auto-generated Users
        await Promise.all(
            fakeUsers.map((user) => {
                Users.create({ ...user });
            }),
        );

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
