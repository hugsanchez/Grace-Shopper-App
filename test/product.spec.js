const { expect } = require("chai");


const { syncAndSeed } = require('../server/db');

const _app = require('../server/app')
const app = require("supertest")(_app);

// beforeEach(async() =>{
//     syncAndSeed();
// })

const axios = require('axios');


const {
    db,
    model:{Products, Users}
} = require("../server/db");

// beforeEach(async() =>{ 
//     await db.sync({force:true})
// });

describe('Routes', () => {
    beforeEach(async() => await syncAndSeed())
        describe('GET all Products', async() => {     
            it('testing get route', async() => {
                const response = await app.get('/api/products');
                expect(response.status).to.equal(200);
            })
            it('does get route match whats in db', async() => {
                const response = await app.get('/api/products');
                const products = await Products.findAll();
                console.log(products.length)
                console.log(response.body.length)
                expect(response.body.length).to.equal(products.length)
            });
        });
        describe('GET all Users', async() => {     
        
            describe('GET all Products', async() => {     
        
                it('testing get route', async() => {
                    const response = await app.get('/api/users');
                    expect(response.status).to.equal(200);
                })
                it('does get route match whats in db', async() => {
                    const response = await app.get('/api/users');
                    const users = await Users.findAll();
                    console.log(users.length)
                    console.log(response.body.length)
                    expect(response.body.length).to.equal(users.length)
                });
            });
        });

        describe('GET Single Product', async() => {     
            it('returns single product mona lisa', async() => {
                const prof = await Products.findOne({
                    where:{
                        name:"PROF!!!!!",
                    }
                });
                const response = await app.get(`/api/products/${prof.id}`);
                console.log(response.body.name)
                expect(response.status).to.equal(200);
                expect(response.body.name).to.equal('PROF!!!!!')
            });
            it('Does it include reviews', async() => {
                const prof = await Products.findOne({
                    where:{
                        name:"A Knight of Alcántara or Calatrava",
                    }
                });
                const response = await app.get(`/api/products/${prof.id}`);
                console.log(response.body.reviews.length)
                expect(response.body.reviews).to.be.an('array');
            })
        });
});