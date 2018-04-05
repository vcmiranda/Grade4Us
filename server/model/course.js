const knex = require('../config/database');

module.exports = {
  /**
   * @desc returns a list of filtered courses
   * @param {filter} JSON Filters the search.
  */
  list() {
    return knex('course')
      .join('grade', 'course.grade_id', 'grade.grade_id')
      .join('teacher', 'course.teacher_id', 'teacher.teacher_id')
      .join('user', 'teacher.user_id', 'user.user_id')
      .select(
        'course.*',
        'grade.*',
        'teacher.teacher_id',
        'user.email',
        'user.firstname',
        'user.lastname',
      );
  },
  /**
   * @desc inserts a new course into the database
   * @param {data} JSON Info related to the course
  */
  create(data) {
    return knex('course')
      .insert(data);
  },
    /**
   * @desc updates course
   * @param {filter} JSON filter course that will be updated
   * @param {data} JSON info that will be updated
  */
  update(filter, data) {
    return knex('course')
      .where(filter)
      .update(data);
  },
};
