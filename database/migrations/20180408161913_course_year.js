exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('course_year', (table) => {
      table.increments('course_year_id').primary().unique().unsigned().notNullable();
      table.integer('course_id').unsigned().notNullable().references('course_id').inTable('course');
      table.integer('year_id').unsigned().notNullable().references('year_id').inTable('year');
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('course_year'),
  ]);
};
