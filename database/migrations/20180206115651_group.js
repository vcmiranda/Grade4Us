exports.up = function (knex, Promise) {
  const date = Math.floor(new Date().getTime() / 1000);
  return Promise.all([
    knex.schema.createTable('group', (table) => {
      table.increments('group_id').primary().unique().unsigned().notNullable();
      table.integer('grade_id').unsigned().notNullable().references('grade_id').inTable('grade');
      table.integer('teacher_id').unsigned().notNullable().references('teacher_id').inTable('teacher');
      table.boolean('deleted').defaultTo(false);
      table.integer('date_modified').unsigned().defaultTo(date);
      table.integer('date_created').unsigned().defaultTo(date);
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('group'),
  ]);
};
