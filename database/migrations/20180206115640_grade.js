exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('grade', (table) => {
      table.increments('grade_id').primary().unique().unsigned().notNullable();
      table.string('grade_name');
      table.string('grade_code');
      table.string('grade_age');
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('grade'),
  ]);
};
