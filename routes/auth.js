const express = require('express');
const { body } = require('express-validator/check');

const authController = require('../controller/auth');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password')
      .isString()
      .isLength({ min: 5 }),
    body('name')
      .isString(),
    body('surname')
      .isString()
  ],
  authController.signup
);

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password')
      .isString()
      .isLength({ min: 5 })
  ],
  authController.login);

module.exports = router;