exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('admin', (table) => {
      table.increments('admin_id').primary().unique().unsigned().notNullable();
      table.integer('user_id').unsigned().unique().notNullable().references('user_id').inTable('user').onDelete('CASCADE');
      table.boolean('deleted').defaultTo(false);
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('admin'),
  ]);
};
