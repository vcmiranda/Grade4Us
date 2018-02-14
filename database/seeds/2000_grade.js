exports.seed = knex => knex('grade').del()
  .then(() => knex('grade').insert([
    { grade_id: 1, grade_name: 'Junior Kindergarten', grade_code: 'JK', grade_age: '3-5' },
    { grade_id: 2, grade_name: 'Kindergarten', grade_code: 'SK', grade_age: '5-6' },
    { grade_id: 3, grade_name: 'Grade 1', grade_code: 'Gr1', grade_age: '6-7' },
    { grade_id: 4, grade_name: 'Grade 2', grade_code: 'Gr2', grade_age: '7-8' },
    { grade_id: 5, grade_name: 'Grade 3', grade_code: 'Gr3', grade_age: '8-9' },
    { grade_id: 6, grade_name: 'Grade 4', grade_code: 'Gr4', grade_age: '9-10' },
    { grade_id: 7, grade_name: 'Grade 5', grade_code: 'Gr5', grade_age: '10-11' },
    { grade_id: 8, grade_name: 'Grade 6', grade_code: 'Gr6', grade_age: '11-12' },
    { grade_id: 9, grade_name: 'Grade 7', grade_code: 'Gr7', grade_age: '12-13' },
    { grade_id: 10, grade_name: 'Grade 8', grade_code: 'Gr8', grade_age: '13-14' },
    { grade_id: 11, grade_name: 'Grade 9', grade_code: 'Gr9', grade_age: '14-15' },
    { grade_id: 12, grade_name: 'Grade 10', grade_code: 'Gr10', grade_age: '15-16' },
    { grade_id: 13, grade_name: 'Grade 11', grade_code: 'Gr11', grade_age: '16-17' },
    { grade_id: 14, grade_name: 'Grade 12', grade_code: 'Gr12', grade_age: '17-18' },
    { grade_id: 15, grade_name: 'Grade 12+', grade_code: 'Gr12+', grade_age: '18-21' },
  ]));
