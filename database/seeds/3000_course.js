exports.seed = knex => knex('course').del()
  .then(() => knex('course').insert([
    { course_id: 1, grade_id: 13, teacher_id: 1, course_name: 'First Aid', course_code: 'FAI2320' },
    { course_id: 2, grade_id: 14, teacher_id: 1, course_name: 'Culinary', course_code: 'CUL4453' },
  ]));
