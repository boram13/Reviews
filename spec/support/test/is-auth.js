const path = require('path');
const { expect } = require('chai');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const authMiddleware = require('../middleware/is-auth');
const User = require('../models/user');

describe('Is User Authenticated', () => {
  it('should set req.user if valid token is provided', () => {
    const req = {
      get: (headerName) => {
        return 'Bearer validtoken';
      }
    };
    const res = {};
    const next = () => { };
    jwt.verify = sinon.stub().returns({ userId: '123' });

    authMiddleware(req, res, next);

    expect(req).to.have.property('user');
    expect(req.user).to.deep.equal({ userId: '123' });
  });
  it('should throw error id no header is provided', () => {
    const req = {
      get: (headerName) => {
        return null;
      }
    };
    const res = {};
    const next = () => { };
    // jwt.verify = sinon.stub().returns({ userId: '123' });

    expect(authMiddleware.bind(this, req, res, next)).to.throw('Not authenticated.')
  });
});


