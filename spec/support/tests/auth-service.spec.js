
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../../models/user');
const { signup, loginUser } = require('../../../service/auth');

describe('User Service', () => {
  describe('signup', () => {
    it('should create a new user', async () => {
      const data = {
        email: 'test@example.com',
        password: 'password',
        name: 'John',
        surname: 'Doe',
        role: 'user'
      };

      const hashedPassword = 'hashedPassword';
      spyOn(bcrypt, 'hash').and.returnValue(hashedPassword);
      spyOn(User.prototype, 'save').and.returnValue({ _id: '123', ...data });

      const result = await signup(data);

      expect(bcrypt.hash).toHaveBeenCalledWith(data.password, 12);
      expect(User.prototype.save).toHaveBeenCalled();
      expect(result).toEqual({ _id: '123', ...data });
    });
  });

  describe('loginUser', () => {
    it('should return a valid token when the login credentials are correct', async () => {
      const email = 'test@example.com';
      const password = 'password';

      const user = {
        email,
        password: 'hashedPassword',
        _id: '123',
        role: 'user'
      };

      const token = 'token';
      spyOn(User, 'findOne').and.returnValue(user);
      spyOn(bcrypt, 'compare').and.returnValue(true);
      spyOn(jwt, 'sign').and.returnValue(token);

      const result = await loginUser(email, password);

      expect(User.findOne).toHaveBeenCalledWith({ email });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
      expect(jwt.sign).toHaveBeenCalledWith(
        { email: user.email, userId: user._id.toString(), role: user.role },
        'secretcode',
        { expiresIn: '1h' }
      );
      expect(result).toEqual({ data: { token, userId: user._id.toString() } });
    });

    it('should throw an error if the email does not exist', async () => {
      const email = 'test@example.com';
      const password = 'password';

      spyOn(User, 'findOne').and.returnValue(null);

      try {
        await loginUser(email, password);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error.message).toEqual("There is no user registrated with this email address");
      }
    });

    it('should throw an error if the password is incorrect', async () => {
      const email = 'test@example.com';
      const password = 'password';

      const user = {
        email,
        password: 'hashedPassword',
        _id: '123',
        role: 'user'
      };

      spyOn(User, 'findOne').and.returnValue(user);
      spyOn(bcrypt, 'compare').and.returnValue(false);

      try {
        await loginUser(email, password);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error.message).toEqual('Wrong password!');
      }
    });

  });
});