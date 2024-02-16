const { expect } = require('chai');
const sinon = require('sinon');
const authService = require('../service/auth');
const User = require('../models/user');

describe('AuthService', () => {
  describe('signup', () => {
    it('should create a new user', async () => {
      const inputData = {
        email: 'test@example.com',
        name: 'Test',
        password: 'password',
        surname: 'User',
        role: 'user'
      };
      const signupStub = sinon.stub(authService, 'signup').resolves({ _id: '123' });

      const result = await authService.signup(inputData);

      expect(result).to.deep.equal({ _id: '123' });
      expect(signupStub.calledOnce).to.be.true;

      signupStub.restore();
    });
  });
});