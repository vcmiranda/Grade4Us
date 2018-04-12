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
  /**
   * @desc Update user data
   * @param req.body.firebaseUID
  */
  updateUser(req, res, next) {
    userModel.update(
      { 'user.user_id': req.body.user_id },
      {
        'user.firstname': req.body.firstname,
        'user.lastname': req.body.lastname,
        'user.email': req.body.email,
        'user.phone': req.body.phone,
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
