const { expect } = require("chai");

const app = require("supertest")(require("../server/server"));

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
