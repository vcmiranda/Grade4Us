const auth = require('../services/service.auth');

module.exports = {
  login(req, res, next) {
    auth.login(req.body.email, req.body.password)
    .then(ret => res.json({ token: ret }))
    .catch(err => next(err));
  },
  register(req, res, next) {
    next();
  },
};
