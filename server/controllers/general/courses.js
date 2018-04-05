const courseModel = require('../../model/course');

module.exports = {
  listCourse(req, res, next) {
    courseModel.list()
      .then((ret) => {
        res.json(ret);
      }).catch(err => next(err));
  },
  createCourse(req, res, next) {
    const courseData = {
      course_code: req.body.course_code,
      course_name: req.body.course_name,
      grade_id: req.body.grade_id,
      teacher_id: req.body.teacher_id,
    };
    courseModel.create(courseData)
      .then((ret) => {
        res.json(ret);
      }).catch(err => next(err));
  },
  updateCourse(req, res, next) {
    const courseFilter = {
      course_id: req.body.course_id,
      deleted: 0,
    };
    const courseData = {
      course_code: req.body.course_code,
      course_name: req.body.course_name,
      grade_id: req.body.grade_id,
    };
    courseModel.update(courseFilter, courseData)
      .then((ret) => {
        res.json(ret);
      }).catch(err => next(err));
  },
};
