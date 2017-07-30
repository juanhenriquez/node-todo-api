const User = require('./../models/user');
const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
  const token = req.header('x-auth');
  jwt.verify(token, 'abc123', (err, decoded) => {
    if (err) {
      //console.log('error');
      // the token is invalid
      return res
        .status(401)
        .send({ error: { type: 'Unauthorized', message: 'You need to login in order to access the requested data' } });
    }
    req.decodedToken = decoded;
    req.token = token;
    return next();
  });
};

const canAccess = async (req, res, next) => {
  //console.log('hola');
  try {
    user = await User.findByIdAndToken(req.decodedToken._id, req.token);
    if (user) {
      req.user = user;
      return next();
    }
  } catch (e) {
    if (e.type === 'Forbidden') {
      return res
        .status(403)
        .send({ error: e });
    } else if (e.type === 'NotFound') {
      return res
        .status(404)
        .send({ error: e });
    }
  }
};

module.exports = {
  isAuthenticated,
  canAccess
}