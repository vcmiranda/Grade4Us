const knex = require('../config/database');

module.exports = {
  /**
   * @desc returns a list of filtered teachers
   * @param {filter} JSON Filters the search.
  */
  get(filter) {
    return knex('teacher')
      .join('user', 'teacher.user_id', 'user.user_id')
      .where(filter)
      .select(
        'user.user_id',
        'user.email',
        'user.firstname',
        'user.lastname',
        'user.phone',
        'teacher.teacher_id',
      );
  },

  /**
   * @desc returns a list of all teachers
   */
  list() {
    return knex('teacher')
      .join('user', 'teacher.user_id', 'user.user_id')
      .select(
        'user.user_id',
        'user.email',
        'user.firstname',
        'user.lastname',
        'user.phone',
        'teacher.teacher_id',
      );
  },
    /**
   * @desc inserts a new teacher into the database
   * @param {data} JSON Info related to the teacher
  */
  create(data) {
    return knex('teacher')
      .insert(data);
  },
  /**
   * @desc deletes teacher (set field deleted as true)
   * @param {filter} JSON filter teacher that will be deleted
  */
  delete(filter, data) {
    return knex('teacher')
      .where(filter)
      .update({ deleted: true });
  },
};
