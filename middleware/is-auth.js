const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  console.log(authHeader)
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    throw error;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(authHeader, 'secretcode');
  } catch (err) {
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    throw error;
  }
  req.user = decodedToken;
console.log(req.user)
  next();

};
