exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.renameTable('group', 'course'),
    knex.schema.alterTable('course', (table) => {
      table.renameColumn('group_id', 'course_id');
      table.string('course_name').notNullable();
      table.string('course_code').unique().notNullable();
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.renameTable('course', 'group'),
    knex.schema.alterTable('group', (table) => {
      table.renameColumn('course_id', 'group_id');
      table.dropColumns('course_name');
      table.dropColumns('course_code');
    }),
  ]);
};
