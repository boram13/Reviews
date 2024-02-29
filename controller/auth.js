const { body, validationResult } = require('express-validator/check');
const authService = require('../service/auth');
const User = require('../models/user');

function callEntyPoint(){
  exports.signup(null,null,null);
  console.log("Hello");
}
exports.signup = async (req, res, next) => { //create user
  // try {
    // const errors = validationResult(req);//mock
    // if (!errors.isEmpty()) {
    //   const error = new Error('Validation failed.');
    //   error.data = errors.array();
    //   throw error;
    // }

    const inputData = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      surname: req.body.surname,
      role: req.body.role
    };

    console.log(inputData)
    const result = await authService.signup(inputData);
    console.log("result", result)
    res.json({ message: 'User created!', userId: result._id });
  // } catch (err) {
    // next(err);
    // console.log("something happen but was correctly handled",err)
  // }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const response = await authService.loginUser(email, password);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

