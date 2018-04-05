const gradeModel = require('../../model/grade');

module.exports = {
  listGrade(req, res, next) {
    gradeModel.list()
      .then((ret) => {
        res.json(ret);
      }).catch(err => next(err));
  },
};
