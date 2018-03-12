// const auth = require('../services/service.auth');

const userModel = require('../model/user');

module.exports = {
  /**
   * @desc Returns user and its role
   * @param req.body.firebaseUID
  */
  login(req, res, next) {
    userModel.get({
      'user.firebaseUID': req.body.firebaseUID,
    })
      .then((ret) => {
        if (ret.length === 0) {
          res.sendStatus(204);
        } else {
          res.json(ret[0]);
        }
      })
      .catch(err => next(err));
  },
};


// module.exports = {
//   login(req, res, next) {
//     auth.login(req.body.email, req.body.password)
//     .then(ret => res.json({ token: ret }))
//     .catch(err => next(err));
//   },
//   register(req, res, next) {
//     next();
//   },
// };
