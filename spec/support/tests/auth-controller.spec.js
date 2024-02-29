const { signup, login } = require('../../../controller/auth');
const authService = require('../../../service/auth');
const { body, validationResult } = require('express-validator');
const { createSpy } = require('jasmine');

describe('Auth Controller', () => {
  describe('signup', () => {
    it('should create a new user', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          name: 'Test',
          password: 'password123',
          surname: 'User',
          role: 'user'
        }
      };
      const res = {
        json: jasmine.createSpy('json')
      };
      const next = jasmine.createSpy('next');

      jasmine.createSpy(validationResult, 'isEmpty').and.returnValue(true);
      spyOn(authService, 'signup').and.returnValue({ _id: 'user123' });

      await signup(req, res, next);

      expect(authService.signup).toHaveBeenCalledWith(req.body);
      expect(res.json).toHaveBeenCalledWith({ message: 'User created!', userId: 'user123' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle validation errors', async () => {
      const req = {
        body: {}
      };
      const res = {};

      jasmine.createSpy(validationResult, 'isNotEmpty').and.returnValue({ msg: 'Invalid input.' });
      spyOn(authService, 'signup').and.throwError({ msg: 'Invalid input.' });

      const next = jasmine.createSpy('next');

      await signup(req, res, next);

      expect(authService.signup).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
      // expect(next.calls.argsFor(0)[0].message).toEqual('Validation failed.');
      // expect(next.calls.argsFor(0)[0].data[0].msg).toEqual('Invalid input.');
  

    });
  });

  describe('login', () => {
    it('should log in a user', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123'
        }
      };
      const res = {
        json: jasmine.createSpy('json')
      };
      const next = jasmine.createSpy('next');

      spyOn(authService, 'loginUser').and.returnValue({ data: { message: 'Logged in successfully' } });

      await login(req, res, next);

      expect(authService.loginUser).toHaveBeenCalledWith(req.body.email, req.body.password);
      expect(res.json).toHaveBeenCalledWith({ message: 'Logged in successfully' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle login errors', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123'
        }
      };
      const res = {};
      const next = jasmine.createSpy('next');
      
      spyOn(authService, 'loginUser').and.throwError('Login failed.');

      await login(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.calls.argsFor(0)[0].message).toEqual('Login failed.');
    });
  });
});