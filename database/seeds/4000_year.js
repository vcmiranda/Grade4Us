const initialYear = 2017;
const finalYear = 2117;
const entries = [];

for (let i = 0; i < (finalYear - initialYear); i++) {
  entries.push({ year_name: `${initialYear + i}/${initialYear + i + 1}` });
}

exports.seed = knex => knex('year').del()
  .then(() => knex('year').insert(entries));
