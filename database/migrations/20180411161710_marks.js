exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('marks', (table) => {
      table.increments('mark_id').primary().unique().unsigned().notNullable();
      table.string('mark_name').notNullable();
    }),
    knex.insert({ mark_name: 'A+' }).into('marks'),
    knex.insert({ mark_name: 'A' }).into('marks'),
    knex.insert({ mark_name: 'A-' }).into('marks'),
    knex.insert({ mark_name: 'B+' }).into('marks'),
    knex.insert({ mark_name: 'B' }).into('marks'),
    knex.insert({ mark_name: 'B-' }).into('marks'),
    knex.insert({ mark_name: 'C+' }).into('marks'),
    knex.insert({ mark_name: 'C' }).into('marks'),
    knex.insert({ mark_name: 'C-' }).into('marks'),
    knex.insert({ mark_name: 'D+' }).into('marks'),
    knex.insert({ mark_name: 'D' }).into('marks'),
    knex.insert({ mark_name: 'D-' }).into('marks'),
    knex.insert({ mark_name: 'F' }).into('marks'),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('marks'),
  ]);
};
