exports.up = function (knex, Promise) {
  const date = Math.floor(new Date().getTime() / 1000);
  return Promise.all([
    knex.schema.createTable('user', (table) => {
      table.increments('user_id').primary().unique().unsigned().notNullable();
      table.string('firebaseUID').unique().notNullable();
      table.string('email').unique().notNullable();
      table.string('emailVerified').defaultTo('false');
      table.string('firstname');
      table.string('lastname');
      table.string('phone');
      table.integer('date_created').unsigned().defaultTo(date);
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user'),
  ]);
};
