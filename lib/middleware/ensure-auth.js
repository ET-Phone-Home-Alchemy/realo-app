const UserService = require('../services/UserService');

module.exports = (req, res, next) => {
  console.log(req.cookies.session);
  try {
    const token = req.cookies.session;
    req.user = UserService.verifyAuthToken(token);
    next();
  } catch(err) {
    console.log(err);
    err.status = 401;
    next(err);
  }
};
