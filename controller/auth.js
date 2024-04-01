const { body, validationResult } = require('express-validator/check');
const authService = require('../service/auth');
const User = require('../models/user');
const EventService = require('../service/event');
const emailService = require("../service/emailService");
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const secretKey = "secretcode";

exports.signup = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const errors = validationResult(req);//mock
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.data = errors.array();
      throw error;
    }

    const inputData = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      surname: req.body.surname,
      role: req.body.role
    };
    
    const result = await authService.signup(inputData);
    const token = jwt.sign({ email: result.email }, secretKey, { expiresIn: "1h" });

    await emailService.sendVerificationEmail(result.email, token);
    await EventService.saveEvent(result._id, "auth", 'signup');
    res.json({ message: 'User created, check your email for verification!', userId: result._id });
  } catch (err) {
    next(err);
    console.log("something happen but was correctly handled", err)
  }
};

exports.activateUser = async (req, res, next) => {
  
  try {
    const { token } = req.params;
    const decodedToken = jwt.verify(token, secretKey);

    if (!decodedToken) {
      return res.status(404).json({ message: 'Invalid or expired token.' });
    }
    await User.findOneAndUpdate(
      { email: decodedToken.email, verificationToken: token },
      { $set: { status: true }, $unset: { verificationToken: 1 } },
      { new: true }
    );
    const user = await User.findOne({ email: decodedToken.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User activated successfully.' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const response = await authService.loginUser(email, password);
    const userId = response.data.userId;
    await EventService.saveEvent(userId, "auth", 'login');
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};
