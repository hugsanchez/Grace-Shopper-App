const { expect } = require("chai");

const app = require("supertest")(require("../server/server"));

const axios = require('axios');

const {
    db,
    model: { Products },
} = require("../server/db");

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
        it('testing get route', async() => {
            const response = await app.get('/api/products');
            const products = await Products.findAll();
            expect(response.status).to.equal(200);
            expect(response.body.length).to.equal(products.length)
        })
    })
})
