exports.up = (knex, Promise) => {
  const date = Math.floor(new Date().getTime() / 1000);
  return Promise.all([
    knex.schema.createTable('course', (table) => {
      table.increments('course_id').primary().unique().unsigned().notNullable();
      table.string('course_name').notNullable();
      table.string('course_code').unique().notNullable();
      table.integer('grade_id').unsigned().notNullable().references('grade_id').inTable('grade');
      table.integer('teacher_id').unsigned().notNullable().references('teacher_id').inTable('teacher');
      table.boolean('deleted').defaultTo(false);
      table.integer('date_modified').unsigned().defaultTo(date);
      table.integer('date_created').unsigned().defaultTo(date);
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('course'),
  ]);
};
