const path = require('path');
const chai = require('chai');
const sinon = require('sinon');
const isAdminMiddleware = require('../middleware/is-admin');
const authMiddleware = require('../middleware/is-auth');
const jwt = require('jsonwebtoken');
const app = require('../app');

const User = require('../models/user');

const expect = chai.expect;

describe('Is User Admin', () => {
  it('should call next() if user is an admin', () => {
    const req = { user: { role: 'admin' } };
    const next = sinon.spy();
    isAdminMiddleware(req, {}, next);
    expect(next.called).to.be.true;
  });

it('should send "Forbidden" message if user is not an admin', () => {
  const req = {
    user: { role: 'user' },
    get: () => {
      return jwt.sign(
        { email: 'test@test.com', userId: 'test', role: 'user' },
        "secretcode",
        { expiresIn: "1h" }
      );
    }
  };
  const res = {
    status: sinon.stub().returnsThis(),
    send: sinon.spy()
  };
  const next = sinon.spy();

  isAdminMiddleware(req, res, next);

  expect(res.status.calledWith(403)).to.not.be.true;

  expect(res.send.calledWith('Forbidden, you are not allowed to make any change because you are not logged in as an administrator!')).to.not.be.true;

  expect(next.called).to.be.false;
});
});