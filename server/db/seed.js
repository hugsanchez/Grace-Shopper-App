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
            Users.create({
                firstName: "Hugo",
                lastName: "Sanchez",
                email: "hugsan@gmail.com",
                username: "hugsan",
                password: "12345678",
                userType: "GUEST",
            })
        ]);

        // Generate Fake Users (not admins!)
        let fakeUsers = Array(10).fill(' ');
        let userPromise = [];
        // let fakeUsers = [];
        // const NUMBER_OF_USERS = 10;
        for (let i = 0; i < fakeUsers.length; i++) {
            fakeUsers[i] = new Users({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                username: faker.internet.userName(),
                password: faker.internet.password(),
            }).save();
            userPromise.push(fakeUsers[i]);
        };
        await Promise.all(userPromise);
        //     // Create fake user details
        //     const firstName = faker.name.firstName();
        //     const lastName = faker.name.lastName();
        //     const email = faker.internet.email();
        //     const username = faker.internet.userName();
        //     const password = faker.internet.password();

        //     fakeUsers.push({
        //         firstName,
        //         lastName,
        //         email,
        //         username,
        //         password,
        //     });

        //     // console.log(`${i} users generated`);
        // }

        // Generate Fake Products and Artists from the Met API
        let productsFake = Array(20).fill(' ');
        let productPromise = [];
        let randId = 437165;

       for(let i = 0; i < productsFake.length; i++) {
          
            const { data: productMet } = await axios.get(
                `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randId}`
                );
            ++randId;
            productsFake[i] = new Products({
                name: productMet.title,
                description: faker.commerce.productDescription(),
                price: Math.floor(Math.random() * 10000),
                year: productMet.objectEndDate,
                stock: Math.floor(Math.random() * 10),
                imgUrl: productMet.primaryImage || '#',
            }).save();
            productPromise.push(productsFake[i]);
        };

        await Promise.all(productPromise);

 

        // Auto-generated Users
        // const otherUsers = await Promise.all(
        //     fakeUsers.map((user) => {
        //         Users.create({ ...user });
        //     }),
        // );

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
                userId: 7,
                productId: 21,
             }),
            Reviews.create({
                detail: 'Looks good I guess...',
                userId: 4,
                productId: 12
            }),
            Reviews.create({
                detail: 'Its a fake, do NOT BUY!!!',
                userId: 3,
                productId: 11,
            }),
            Reviews.create({
                detail: "I hate the Mona Lisa >:(",
                userId: 5,
                productId: 21,
             }),
            Reviews.create({
                detail: 'Looks great!',
                userId: 10,
                productId: 21,
            }),
            Reviews.create({
                detail: 'Do NOT BUY!!!',
                userId: 3,
                productId: 21,
            })
        ]);


        const [monaLisa] = products;
        //const [craig] = users;
        const [leonardoDaVinci] = artists;
        const [classical] = categories;

        monaLisa.categoryId = classical.id;

        await Promise.all([monaLisa.save()]);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { syncAndSeed };
