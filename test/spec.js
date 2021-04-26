const { expect } = require("chai");

const app = require("supertest")(require("../server/server"));

const {
    db,
    model: { Products, Artists, Categories, Users, Orders, Reviews },
} = require("../server/db");

describe("Backend", () => {
    describe("Product Model", () => {
        let product;

        before(() => {
            product = Products.build();
        });

        it("requires `name`", async () => {
            try {
                await product.validate();
                throw new Error("Validation succeeded but should have failed");
            } catch (err) {
                expect(err.message).to.contain("name");
            }
        });
    });
});
