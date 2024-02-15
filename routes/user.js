const express = require('express');

const router = express.Router();
const userController = require('../controller/user');

const isAuth = require('../middleware/is-auth');

const isAdmin = require('../middleware/is-admin');
const { body, param } = require('express-validator/check');

router.get('/', userController.getAllUsers);

router.put('/:userId', userController.updateUser);

router.delete('/:userId', userController.deleteUser);

module.exports = router;