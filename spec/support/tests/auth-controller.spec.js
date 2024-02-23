// const { signup } = require('../../../controller/auth');
// const authService = require('../../../service/auth');
// const { validationResult } = require('express-validator');
// const { login } = require('../../../controller/auth');
// describe('Signup Functionality', () => {
//   let signupSpy;
//   beforeEach(() => {
//     signupSpy = spyOn(authService, 'signup').and.returnValue({ _id: 'generatedUserId' });
//   });
//   it('should create a new user when input is valid', async () => {
//     // Mock the input data
//     const validationResultMock = jasmine.createSpy('validationResult').and.returnValue({ isEmpty: () => true });

//     const req = {
//       body: {
//         email: 'test@example.com',
//         name: 'John',
//         password: 'password',
//         surname: 'Doe',
//         role: 'user'
//       },
//       validationResult: jasmine.createSpy('validationResult').and.returnValue(validationResultMock),
//     };
//     const res = {
//       json: jasmine.createSpy('json'),
//     };
//     const next = jasmine.createSpy('next');
//     await signup(req, res, next);
//     expect(validationResultMock).toHaveBeenCalledWith(req);
//     expect(signupSpy).toHaveBeenCalledWith({
//       email: req.body.email,
//       name: req.body.name,
//       password: req.body.password,
//       surname: req.body.surname,
//       role: req.body.role
//     });
//     expect(res.json).toHaveBeenCalledWith({ message: 'User created!', userId: 'generatedUserId' });
//   });
// });

// describe('Login Functionality', () => {
//   it('should login a user with valid credentials', async () => {
//     const req = {
//       body: {
//         email: 'test@example.com',
//         password: 'password'
//       }
//     };

//     const res = {
//       json: jasmine.createSpy('json')
//     };

//     const next = jasmine.createSpy('next');

//     spyOn(authService, 'loginUser').and.returnValue(Promise.resolve({ data: { token: 'generatedToken', userId: 'userId' } }));

//     await login(req, res, next);

//     expect(authService.loginUser).toHaveBeenCalledWith(req.body.email, req.body.password);
//     expect(res.json).toHaveBeenCalledWith({ token: 'generatedToken', userId: 'userId' });
//   });

// });

const { signup } = require('../../../controller/auth');
const authService = require('../../../service/auth');
const { validationResult } = require('express-validator'); // Require Express Validator
const { login } = require('../../../controller/auth');

describe('Signup Functionality', () => {
  let signupSpy;
  beforeEach(() => {
    signupSpy = spyOn(authService, 'signup').and.returnValue({ _id: 'generatedUserId' });
  });
  it('should create a new user when input is valid', async () => {
    // Mock the input data
    const req = {
      body: {
        email: 'test@example.com',
        name: 'John',
        password: 'password',
        surname: 'Doe',
        role: 'user'
      }
    };
    const res = {
      json: jasmine.createSpy('json')
    };
    const next = jasmine.createSpy('next');
    const validationResultMock = jasmine.createSpy('validationResult').and.returnValue({ isEmpty: () => true });
    spyOn(validationResult, 'req').and.returnValue(validationResultMock); // Using Express Validator
    await signup(req, res, next);
    expect(validationResultMock).toHaveBeenCalledWith(req);
    expect(signupSpy).toHaveBeenCalledWith({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      surname: req.body.surname,
      role: req.body.role
    });
    expect(res.json).toHaveBeenCalledWith({ message: 'User created!', userId: 'generatedUserId' });
  });
});

describe('Login Functionality', () => {
  it('should login a user with valid credentials', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password'
      }
    };

    const res = {
      json: jasmine.createSpy('json')
    };

    const next = jasmine.createSpy('next');

    spyOn(authService, 'loginUser').and.returnValue(Promise.resolve({ data: { token: 'generatedToken', userId: 'userId' } }));

    await login(req, res, next);

    expect(authService.loginUser).toHaveBeenCalledWith(req.body.email, req.body.password);
    expect(res.json).toHaveBeenCalledWith({ token: 'generatedToken', userId: 'userId' });
  });

});