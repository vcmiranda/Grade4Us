exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('parent_student', (table) => {
      table.increments('parent_student_id').primary().unique().unsigned().notNullable();
      table.integer('parent_id').unsigned().notNullable().references('parent_id').inTable('parent').onDelete('CASCADE');
      table.integer('student_id').unsigned().unique().notNullable().references('student_id').inTable('student').onDelete('CASCADE');
      table.boolean('deleted').defaultTo(false);
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('parent_student'),
  ]);
};
