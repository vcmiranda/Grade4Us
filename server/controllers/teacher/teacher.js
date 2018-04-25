const teacherModel = require('../../model/teacher');
const userModel = require('../../model/user');

module.exports = {
  get(req, res, next) {
    teacherModel.get(
      { 'user.user_id': req.params.user_id },
    )
      .then((ret) => {
        res.json(ret);
      }).catch(err => next(err));
  },
  list(req, res, next) {
    teacherModel.list()
      .then((ret) => {
        res.json(ret);
      }).catch(err => next(err));
  },
  create(req, res, next) {
    const userData = {
      'user.email': req.body.email,
      'user.firstname': req.body.firstname,
      'user.lastname': req.body.lastname,
      'user.phone': req.body.phone,
    };
    userModel.create(userData)
      .then((userID) => {
        teacherModel.create(
          { user_id: userID[0] },
        )
          .then((ret) => {
            res.json(ret);
          }).catch(err => next(err));
      }).catch(err => next(err));
  },
  update(req, res, next) {
    const userFilter = {
      user_id: req.body.user_id,
      deleted: 0,
    };
    const userData = {
      'user.email': req.body.email,
      'user.firstname': req.body.firstname,
      'user.lastname': req.body.lastname,
      'user.phone': req.body.phone,
    };
    userModel.update(userFilter, userData)
      .then((ret) => {
        res.json(ret);
      }).catch(err => next(err));
  },
  delete(req, res, next) {
    const teacherFilter = {
      teacher_id: req.body.teacher_id,
      deleted: 0,
    };
    teacherModel.delete(teacherFilter)
      .then((ret) => {
        res.json(ret);
      }).catch(err => next(err));
  },
};
