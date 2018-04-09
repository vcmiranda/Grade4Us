exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('year', (table) => {
      table.increments('year_id').primary().unique().unsigned().notNullable();
      table.string('year_name').notNullable();
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('year'),
  ]);
};
