// const { expect } = require('chai');
// const request = require('supertest');
// const app = require('../app');

// describe('API Endpoints', () => {
//   it('POST /signup should create a new user', async () => {
//     const response = await request(app)
//       .post('/signup')
//       .send({
//         email: 'test@example.com',
//         name: 'Test',
//         password: 'password',
//         surname: 'User',
//         role: 'user'
//       });
//     expect(response.statusCode).to.equal(200);
//     expect(response.body.message).to.equal('User created!');
//     expect(response.body.userId).to.be.a('string');
//   });

//   it('POST /login should return token for valid credentials', async () => {
//     const response = await request(app)
//       .post('/login')
//       .send({
//         email: 'test@example.com',
//         password: 'password'
//       });
//     expect(response.statusCode).to.equal(200);
//     expect(response.body.token).to.be.a('string');
//   });
// });