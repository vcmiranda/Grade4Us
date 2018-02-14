const auth = require('../services/service.auth');

module.exports = (req, res, next) => {
  auth.validate(req.headers.authorization, req.params).then(() => next()).catch(err => next(err));
};
