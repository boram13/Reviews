// const { expect } = require('chai');
// const request = require('supertest');
// const app = require('../app'); // Assuming Express app instance is exported from app.js

// describe('API Endpoints', () => {
//   it('POST /reviews should create a new review', async () => {
//     const response = await request(app)
//       .post('/reviews')
//       .send({
//         userId: '123',
//         rate: 5,
//         description: 'Great review'
//       });
//     expect(response.statusCode).to.equal(201);
//     expect(response.body.userId).to.equal('123');
//     expect(response.body.rate).to.equal(5);
//     expect(response.body.description).to.equal('Great review');
//   });
// });