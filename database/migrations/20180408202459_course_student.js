exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('course_student', (table) => {
      table.increments('course_student_id').primary().unique().unsigned().notNullable();
      table.integer('course_id').unsigned().notNullable().references('course_id').inTable('course');
      table.integer('student_id').unsigned().notNullable().references('student_id').inTable('student');
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('course_student'),
  ]);
};
