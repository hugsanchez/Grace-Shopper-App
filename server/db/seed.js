const db = require("./db");
const {
    model: { Products, Artists, Categories, Users, Orders, Reviews },
} = require("./model");

const faker = require("faker");
const axios = require("axios");

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

        // Generate Fake Products and Artists from the Met API
        let productsFake = Array(20).fill(' ');
        let productPromise = [];
        let randId = 437165;

       for(let i = 0; i < productsFake.length; i++) {
            //const randId = Math.floor(Math.random() * (437185 - 437165 + 1) + 437165);
            //const randId = Math.floor(Math.random() * 10) + 1;
            const { data: productMet } = await axios.get(
                `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randId}`
                );
            ++randId;
            productsFake[i] = new Products({
                name: productMet.title,
                description:productMet.objectName,
                price: Math.floor(Math.random() * 10000),
                year: productMet.objectEndDate,
                stock: Math.floor(Math.random() * 10),
                imgUrl: productMet.primaryImage || '#',
            }).save();
            productPromise.push(productsFake[i]);
        };

        await Promise.all(productPromise);
        // let fakeProducts = [];
        // const NUMBER_OF_PRODUCTS = 20;
        // for (let i = 1; i <= NUMBER_OF_PRODUCTS; i++) {
        //     const randId = Math.floor(Math.random() * (437165 - 437175 + 1) + 437165);;

        //     const { data: product } = await axios.get(
        //         `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randId}`,
        //     );

        //     // console.log product to see more properties!
        //     const {
        //         artistDisplayName,
        //         title,
        //         primaryImage,
        //         objectEndDate,
        //         objectName,
        //     } = product;

        //     const name = title;
        //     const artist = artistDisplayName || "Unknown";
        //     const price = Math.floor(Math.random() * 10000);
        //     const year = objectEndDate;
        //     const imgUrl = primaryImage || "#";
        //     const stock = Math.floor(Math.random() * 10);
        //     const description = objectName;

        //     fakeProducts.push({
        //         name,
        //         description: "fake data",
        //         price,
        //         year,
        //         stock,
        //         imgUrl,
        //     });
        //     // console.log(`${i} products generated`);
        // }

        // Custom Users
        const users = await Promise.all([
            Users.create({
                firstName: "Craig",
                lastName: "Ferreira",
                email: "cf@gmail.com",
                username: "cferreira",
                password: "12345678",
            }),
            Users.create({
                firstName: "Anthony",
                lastName: "Sgro",
                email: "as@gmail.com",
                username: "asgro",
                password: "12345678",
                userType: "ADMIN",
            }),
        ]);

        // Auto-generated Users
        await Promise.all(
            fakeUsers.map((user) => {
                Users.create({ ...user });
            }),
        );

        // Custom Categories
        const categories = await Promise.all([
            Categories.create({
                name: "Classical",
            }),
        ]);

        // Custom Products
        const products = await Promise.all([
            Products.create({
                name: "Mona Lisa",
                description: "art",
                price: 100000.0,
                year: 1900,
                imgURL: "#",
            }),
        ]);

        // Auto-generated Products
        // await Promise.all(
        //     fakeProducts.map((product) => {
        //         Products.create({ ...product });
        //     }),
        // );

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
