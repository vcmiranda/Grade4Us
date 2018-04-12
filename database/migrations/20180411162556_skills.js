exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('skills', (table) => {
      table.increments('skill_id').primary().unique().unsigned().notNullable();
      table.string('skill_name').notNullable();
    }),
    knex.insert({ skill_name: 'Responsibility' }).into('skills'),
    knex.insert({ skill_name: 'Organization' }).into('skills'),
    knex.insert({ skill_name: 'Independent Work' }).into('skills'),
    knex.insert({ skill_name: 'Collaboration' }).into('skills'),
    knex.insert({ skill_name: 'Initiative' }).into('skills'),
    knex.insert({ skill_name: 'Self-Regulation' }).into('skills'),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('skills'),
  ]);
};
