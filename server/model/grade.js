const knex = require('../config/database');

module.exports = {
  /**
   * @desc returns a list of filtered grades
   * @param {filter} JSON Filters the search.
  */
  list() {
    return knex('grade');
  },

};
