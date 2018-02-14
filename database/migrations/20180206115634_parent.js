exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('parent', (table) => {
      table.increments('parent_id').primary().unique().unsigned().notNullable();
      table.integer('user_id').unsigned().unique().notNullable().references('user_id').inTable('user').onDelete('CASCADE');
      table.boolean('deleted').defaultTo(false);
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('parent'),
  ]);
};
