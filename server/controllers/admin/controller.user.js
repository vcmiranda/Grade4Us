const userModel = require('../../model/user');

module.exports = {
  /**
   * @desc Returns a list of users
   * @param req.query.user optional (admin, teacher or parent)
   */
  list(req, res, next) {
    if (req.query.user === 'admin') {
      userModel.list('admin.admin_id')
        .then((ret) => {
          if (ret.length === 0) {
            res.sendStatus(204);
          } else {
            res.json(ret);
          }
        })
        .catch(err => next(err));
    } else if (req.query.user === 'teacher') {
      userModel.list('teacher.teacher_id')
        .then((ret) => {
          if (ret.length === 0) {
            res.sendStatus(204);
          } else {
            res.json(ret);
          }
        })
        .catch(err => next(err));
    } else if (req.query.user === 'parent') {
      userModel.list('parent.parent_id')
        .then((ret) => {
          if (ret.length === 0) {
            res.sendStatus(204);
          } else {
            res.json(ret);
          }
        })
        .catch(err => next(err));
    } else {
      userModel.list('user.user_id')
        .then((ret) => {
          if (ret.length === 0) {
            res.sendStatus(204);
          } else {
            res.json(ret);
          }
        })
        .catch(err => next(err));
    }
  },
  /**
   * @desc Returns a single user
   * @param req.param.user_id
   */
  get(req, res, next) {
    userModel.get({
      'user.user_id': req.params.user_id,
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
