const express = require('express');
const { body } = require('express-validator/check');

const authController = require('../controller/auth');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/components/schemas/User' 
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Internal Server Error
 */

router.put(
  '/sign-up',
  // [
  //   body('email')
  //     .isEmail()
  //     .withMessage('Please enter a valid email.')
  //     .normalizeEmail(),
  //   body('password')
  //     .isString()
  //     .isLength({ min: 5 }),
  //   body('name')
  //     .isString(),
  //   body('surname')
  //     .isString(),
  //   body('role')
  //   .isString()
  // ],
  authController.signup
);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

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