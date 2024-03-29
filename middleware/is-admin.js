const User = require('../models/user');

module.exports = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); 
  } else {
    res.send('Forbidden, you are not allowed to make any change because you are not logged in as an administator!');
  }
}