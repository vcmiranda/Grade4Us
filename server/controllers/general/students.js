const studentModel = require('../../model/student');

module.exports = {
  get(req, res, next) {
    studentModel.get(
      { student_id: req.params.student_id },
    )
      .then((ret) => {
        res.json(ret);
      }).catch(err => next(err));
  },
  list(req, res, next) {
    studentModel.list()
      .then((ret) => {
        res.json(ret);
      }).catch(err => next(err));
  },
  create(req, res, next) {
    const studentData = {
      firstname: req.body.course_code,
      lastname: req.body.course_name,
      date_birthday: req.body.grade_id,
      email: req.body.teacher_id,
      current_student: req.body.current_student,
      date_enrolled: req.body.date_enrolled,
      date_left: req.body.date_left,
    };
    studentModel.create(studentData)
      .then((ret) => {
        res.json(ret);
      }).catch(err => next(err));
  },
  update(req, res, next) {
    const studentFilter = {
      student_id: req.body.student_id,
      deleted: 0,
    };
    const studentData = {
      firstname: req.body.course_code,
      lastname: req.body.course_name,
      date_birthday: req.body.grade_id,
      email: req.body.teacher_id,
      current_student: req.body.current_student,
      date_enrolled: req.body.date_enrolled,
      date_left: req.body.date_left,
    };
    studentModel.update(studentFilter, studentData)
      .then((ret) => {
        res.json(ret);
      }).catch(err => next(err));
  },
  delete(req, res, next) {
    const studentFilter = {
      student_id: req.body.student_id,
      deleted: 0,
    };
    studentModel.delete(studentFilter)
      .then((ret) => {
        res.json(ret);
      }).catch(err => next(err));
  },
};
