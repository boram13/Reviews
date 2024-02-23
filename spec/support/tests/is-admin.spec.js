const User = require('../../../models/user');
const adminMiddleware = require('../../../middleware/is-admin');

describe('Admin Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: {
        role: 'admin'
      }
    };
    res = {
      send: jasmine.createSpy('send')
    };
    next = jasmine.createSpy('next');
  });

  it('should call next if the user is an admin', () => {
    adminMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  it('should send a forbidden message if the user is not an admin', () => {
    req.user.role = 'user';
    adminMiddleware(req, res, next);
    expect(res.send).toHaveBeenCalledWith('Forbidden, you are not allowed to make any change because you are not logged in as an administator!'); 
    expect(next).not.toHaveBeenCalled();
});
});