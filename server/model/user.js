const knex = require('../config/database');

module.exports = {
  /**
   * @desc returns a list of filtered users
   * @param {filter} JSON Filters the search. eg { parent.parent_id != null }
  */
  get(filter) {
    return knex('user')
      .leftJoin('admin', 'user.user_id', 'admin.user_id')
      .leftJoin('teacher', 'user.user_id', 'teacher.user_id')
      .leftJoin('parent', 'user.user_id', 'parent.user_id')
      .where(filter)
      .select(
        'user.user_id',
        'user.email',
        'user.firstname',
        'user.lastname',
        'user.phone',
        'admin.admin_id',
        'teacher.teacher_id',
        'parent.parent_id',
      );
  },

  /**
   * @desc returns a list of filtered users
   * @param {filter} JSON Filters the search. eg { parent.parent_id != null }
   */
  list(filter) {
    return knex('user')
      .leftJoin('admin', 'user.user_id', 'admin.user_id')
      .leftJoin('teacher', 'user.user_id', 'teacher.user_id')
      .leftJoin('parent', 'user.user_id', 'parent.user_id')
      .whereNotNull(filter)
      .select('user.*', 'admin.admin_id', 'teacher.teacher_id', 'parent.parent_id');
  },
  /**
   * @desc updates user
   * @param {filter} JSON filter user that will be updated
   * @param {data} JSON info that will be updated
  */
  update(filter, data) {
    return knex('user')
      .where(filter)
      .update(data);
  },
};
