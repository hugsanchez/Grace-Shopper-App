const { expect } = require("chai");


const { syncAndSeed } = require('../server/db');

const _app = require('../server/app')
const app = require("supertest")(_app);

const axios = require('axios');


const {
    db,
    model: { Products },
} = require("../server/db");


describe('Testing', () => {
    it('equals 2', ()=>{
        expect(1 + 1).to.equal(2)
    })
});

describe("Backend", () => {
    describe("Product Model", () => {
        let product;

        beforeEach(() => {
            product = Products.build();
        });

        it("requires all fields", async () => {
            try {
                await product.validate();
                throw new Error("Validation succeeded but should have failed");
            } catch (err) {
                expect(err.message).to.contain("name");
                expect(err.message).to.contain("description");
                expect(err.message).to.contain("price");
                expect(err.message).to.contain("year");
            }
        });
    });
});


describe('Routes', () => {
    describe('GET /', () => {
        beforeEach(async () => {
            await db.sync({ force: true });
            //await syncAndSeed();
          });
     
        it('testing get route', async() => {
            const response = await app.get('/api/products');
            expect(response.status).to.equal(200);
           // expect(response.body.length).to.equal(products.length)
        })
        it('compare axios and get', async() => {
            const response = await app.get('/api/products');
            const products = await Products.findAll();
            expect(response.body.length).to.equal(products.length)
        })
    })
})
