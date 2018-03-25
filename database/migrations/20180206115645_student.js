exports.up = (knex, Promise) => {
  const date = Math.floor(new Date().getTime() / 1000);
  return Promise.all([
    knex.schema.createTable('student', (table) => {
      table.increments('student_id').primary().unique().unsigned().notNullable();
      table.string('firstname').notNullable();
      table.string('lastname').notNullable();
      table.integer('grade_id').unsigned().notNullable().references('grade_id').inTable('grade');
      table.integer('date_birthday');
      table.string('email');
      table.boolean('current_student').defaultTo(true);
      table.boolean('deleted').defaultTo(false);
      table.integer('date_enrolled');
      table.integer('date_left');
      table.integer('date_created').unsigned().defaultTo(date);
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('student'),
  ]);
};
