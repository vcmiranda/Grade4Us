const knex = require('../config/database');

module.exports = {
  /**
   * @desc returns a filtered student
  */
  get(filter) {
    return knex('student')
      .where(filter);
  },
  /**
   * @desc returns a list of all student
  */
  list() {
    return knex('student');
  },
  /**
   * @desc inserts a new student into the database
   * @param {data} JSON Info related to the student
  */
  create(data) {
    return knex('student')
      .insert(data);
  },
    /**
   * @desc updates student
   * @param {filter} JSON filter student that will be updated
   * @param {data} JSON info that will be updated
  */
  update(filter, data) {
    return knex('student')
      .where(filter)
      .update(data);
  },
  /**
   * @desc deletes student (set field deleted as true)
   * @param {filter} JSON filter student that will be deleted
  */
  delete(filter, data) {
    return knex('student')
      .where(filter)
      .update({ deleted: true });
  },
};
