const { expect } = require('chai');

// const { syncAndSeed } = require('../server/db/seed');

// const app = require('supertest')(require('../server/server'));

// describe('Routes', () => {
//     //beforeEach (() => syncAndSeed());
//     describe('GET /', () => {
//         it('show info', async() => {
//             const response = await app.get('/');
//             expect(response.status).to.equal(200);
//             expect(response.text).to.include('Grace Shopper Project');
//         });
//     });

    // describe('GET /api/products', () => {
    //     it('return products', async() => {
    //         const response = await app.get('/api/products');
    //         expect(response.status).to.equal(200);
    //     });
    // });
//});

describe('Testing', () => {
    it('equals 2', ()=>{
        expect(1 + 1).to.equal(2)
    })
});