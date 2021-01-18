const UserService = require('../services/UserService');

module.exports = (req, res, next) => {
  try {
    console.log(req)
    const token = req.cookies.session;
    req.user = UserService.verifyAuthToken(token);
    next();
  } catch(err) {
    console.log(err);
    err.status = 401;
    next(err);
  }
};
