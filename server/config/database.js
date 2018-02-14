// Returns the selected database from ./knexfile
const Knex = require('knex');
const knexfile = (require('../knexfile').development);
const knexGenericErrors = require('knex-generic-errors');

const knex = knexGenericErrors.attach(Knex, '0.14.2', () => Knex(knexfile));

module.exports = knex;
