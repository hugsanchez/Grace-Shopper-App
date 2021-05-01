const db = require("./db");
const {
    model: {
        Products,
        Artists,
        Categories,
        Users,
        Orders,
        Reviews,
        ProductsOrders,
    },
} = require("./model");

const faker = require("faker");
const axios = require("axios");

const syncAndSeed = async () => {
    try {
        await db.authenticate();
        console.log("Database Connected");

        await db.sync({ force: true });

        // Custom Users
        await Promise.all([
            new Users({
                firstName: "Craig",
                lastName: "Ferreira",
                email: "cf@gmail.com",
                username: "cferreira",
                password: "12345678",
            }).save(),
            new Users({
                firstName: "Anthony",
                lastName: "Sgro",
                email: "as@gmail.com",
                username: "asgro",
                password: "12345678",
                userType: "ADMIN",
            }).save(),
            new Users({
                firstName: "Hugo",
                lastName: "Sanchez",
                email: "hugsan@gmail.com",
                username: "hugsan",
                password: "12345678",
                userType: "GUEST",
            }).save(),
        ]);

        // Generate Fake Users (not admins!)
        let fakeUsers = Array(10).fill(" ");
        let userPromise = [];

        fakeUsers.forEach((user) => {
            user = new Users({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                username: faker.internet.userName(),
                password: faker.internet.password(),
            }).save();
            userPromise.push(user);
        });
        await Promise.all(userPromise);

        // Generate Fake Products and Artists from the Met API
        let fakeArt = Array(20).fill(" ");

        const promise = async (fakeArt) => {
            let productPromise = [];
            let randId = 437165;

            for (let i = 0; i < fakeArt.length; i++) {
                const { data: productMet } = await axios.get(
                    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randId}`,
                );
                randId++;
                productPromise.push(
                    new Products({
                        name: productMet.title,
                        description: faker.commerce.productDescription(),
                        price: Math.floor(Math.random() * 10000),
                        year: productMet.objectEndDate,
                        stock: Math.floor(Math.random() * 10),
                        imgUrl:
                            productMet.primaryImage ||
                            "https://ualr.edu/elearning/files/2020/10/No-Photo-Available.jpg",
                    }).save(),
                );
                // productPromise.push(art);
            }
            return productPromise;
        };
        const array = promise(fakeArt);
        await Promise.all([array]);
        // console.log(array)

        await Promise.all([
            new Products({
                name: "Mona Lisa",
                description: "art",
                price: 100000.0,
                year: 1900,
                imgUrl:
                    "https://s.abcnews.com/images/International/mona_lisa_file_getty_190717_hpMain_20190717-061249_4x5_608.jpg",
            }).save(),
            new Products({
                name: "PROF!!!!!",
                description: "ART AF",
                price: 100000.0,
                year: 2020,
                imgUrl:
                    "https://ualr.edu/elearning/files/2020/10/No-Photo-Available.jpg",
            }).save(),
        ]);

        // Auto-generated Products
        // await Promise.all(
        //     fakeProducts.map((product) => {
        //         Products.create({ ...product });
        //     }),
        // );

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

        const artists = await Promise.all([
            Artists.create({
                name: "Leonardo Da Vinci",
            }),
        ]);

        const orders = await Promise.all([
            Orders.create({
                userId: 1,
            }),
            Orders.create({
                userId: 2,
            }),
            Orders.create({
                userId: 2,
            }),
            Orders.create({
                userId: 2,
            }),
            Orders.create({
                userId: 3,
            }),
            Orders.create({
                userId: 3,
            }),
        ]);

        await Promise.all([
            ProductsOrders.create({
                productId: 2,
                orderId: 1,
                quantity: 4,
            }),
            ProductsOrders.create({
                productId: 4,
                orderId: 1,
                quantity: 1,
            }),
            ProductsOrders.create({
                productId: 5,
                orderId: 1,
                quantity: 10,
            }),
            ProductsOrders.create({
                productId: 1,
                orderId: 2,
                quantity: 2,
            }),
            ProductsOrders.create({
                productId: 7,
                orderId: 3,
                quantity: 8,
            }),
            ProductsOrders.create({
                productId: 3,
                orderId: 3,
                quantity: 1,
            }),
            ProductsOrders.create({
                productId: 3,
                orderId: 4,
                quantity: 1,
            }),
            ProductsOrders.create({
                productId: 8,
                orderId: 5,
                quantity: 1,
            }),
            ProductsOrders.create({
                productId: 1,
                orderId: 6,
                quantity: 2,
            }),
            ProductsOrders.create({
                productId: 2,
                orderId: 6,
                quantity: 1,
            }),
        ]);

        // await Promise.all([
        //     new Reviews({
        //         detail: "I loved the Mona Lisa, 10/10 would go again!",
        //         userId: 6,
        //         productId: 1,
        //     }).save()
        // ])
        const review = await Promise.all([
            Reviews.create({
                detail: "I loved the Mona Lisa, 10/10 would go again!",
                userId: 6,
                productId: 10,
            }),
            Reviews.create({
                detail: "Looks good I guess...",
                userId: 7,
                productId: 10,
            }),
            Reviews.create({
                detail: "Its a fake, do NOT BUY!!!",
                userId: 9,
                productId: 10,
            }),
            Reviews.create({
                detail: "I hate the Mona Lisa >:(",
                userId: 4,
                productId: 16,
            }),
            Reviews.create({
                detail: "Looks great!",
                userId: 9,
                productId: 21,
            }),
            Reviews.create({
                detail: "Do NOT BUY!!!",
                userId: 1,
                productId: 7,
            }),
        ]);

        // const [monaLisa] = products;
        // //const [craig] = users;
        // const [leonardoDaVinci] = artists;
        // const [classical] = categories;

        // monaLisa.categoryId = classical.id;

        // await Promise.all([monaLisa.save()]);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { syncAndSeed };
