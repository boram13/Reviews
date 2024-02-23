const jwt = require('jsonwebtoken');
const authMiddleware = require('../../../middleware/is-auth');
const Jasmine = require('jasmine');
const jasmine = new Jasmine();

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      get: (headerName) => {
        if (headerName === 'Authorization') {
          return 'Bearer validtoken';
        }
      },
    };
    res = {};
    next = jasmine.createSpy('next');
  });

  it('should set req.user if valid token is provided', () => {
    spyOn(jwt, 'verify').and.returnValue({ userId: '123' });
    authMiddleware(req, res, next);
    expect(req).toHaveProperty('user');
    expect(req.user).toEqual({ userId: '123' });
    expect(next).toHaveBeenCalled();
  });

  it('should throw an error if no token is provided', () => {
    req.get = () => undefined;
    expect(() => {
      authMiddleware(req, res, next);
    }).toThrowError('Not authenticated.');
    expect(next).toHaveBeenCalled();
  });

  it('should throw an error if token verification fails', () => {
    spyOn(jwt, 'verify').and.throwError('Invalid token');
    expect(() => {
      authMiddleware(req, res, next);
    }).toThrowError('Invalid token');
    expect(next).not.toHaveBeenCalled();
  });

  it('should throw an error if decoded token is not valid', () => {
    spyOn(jwt, 'verify').and.returnValue(null);
    expect(() => {
      authMiddleware(req, res, next);
    }).toThrowError('Not authenticated.');
    expect(next).not.toHaveBeenCalled();
  });
});