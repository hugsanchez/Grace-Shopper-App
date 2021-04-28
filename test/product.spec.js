const { expect } = require("chai");

const { syncAndSeed } = require('../server/db/seed');

const app = require("supertest")(require("../server/server"));

const axios = require('axios');
// beforeEach(async() => await syncAndSeed());


const {
    db,
    model: { Products },
} = require("../server/db");

// describe("Backend", () => {
//     describe("Product Model", () => {
//         let product;

//         beforeEach(() => {
//             product = Products.build();
//         });

//         it("requires all fields", async () => {
//             try {
//                 await product.validate();
//                 throw new Error("Validation succeeded but should have failed");
//             } catch (err) {
//                 expect(err.message).to.contain("name");
//                 expect(err.message).to.contain("description");
//                 expect(err.message).to.contain("price");
//                 expect(err.message).to.contain("year");
//             }
//         });
//     });
// });

describe('Routes', () => {
    beforeEach(async () => {
        await db.sync({ force: true });
      });
    describe('GET /', () => {
        it('testing get route', async() => {
            const response = await app.get('/api/products');
            //const products = await Products.findAll();
            expect(response.status).to.equal(200);
           // expect(response.body.length).to.equal(products.length)
        })
    })
})
