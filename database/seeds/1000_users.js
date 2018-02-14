exports.seed = knex => knex('user').del()
  .then(() => knex('user').insert([
    { user_id: 1, firebaseUID: 'KwvfbeoGBZa4zkHkMJ4gquU4yF82', firstname: 'Admin', lastname: 'User', email: 'admin@test.com' },
    { user_id: 2, firebaseUID: 'iWdWpd7UIIg7iPn8ytrMIeSHgvH2', firstname: 'Teacher', lastname: 'User', email: 'teacher@test.com' },
    { user_id: 3, firebaseUID: '7NKHrCDIjnfGMDsIeY5pYPyifsB2', firstname: 'Parent', lastname: 'User', email: 'parent@test.com' },
    { user_id: 4, firebaseUID: 'v6QzXYuEcEXFurWk9MWlkgKRI8l1', firstname: 'Vitor', lastname: 'Miranda', email: 'vitorcomiranda@gmail.com' },
    { user_id: 5, firebaseUID: 'Q3CrV9N8ILaL6PFCfnImC0f0hPC3', firstname: 'Paulo', lastname: 'Santos', email: 'pguilherme@gmail.com' },
    { user_id: 6, firebaseUID: 'oSpf5S34f2ZHEg9LWYVxDtaTctV2', firstname: 'Nick', lastname: 'Shmyrev', email: 'bluts.fr@gmail.com' },
  ]))
  .then(() => knex('admin').del())
  .then(() => knex('admin').insert([
    { admin_id: 1, user_id: 1 },
    { admin_id: 2, user_id: 4 },
    { admin_id: 3, user_id: 5 },
    { admin_id: 4, user_id: 6 },
  ]))
  .then(() => knex('teacher').del())
  .then(() => knex('teacher').insert([
    { teacher_id: 1, user_id: 2 },
    { teacher_id: 2, user_id: 4 },
    { teacher_id: 3, user_id: 5 },
    { teacher_id: 4, user_id: 6 },
  ]))
  .then(() => knex('parent').del())
  .then(() => knex('parent').insert([
    { parent_id: 1, user_id: 3 },
    { parent_id: 2, user_id: 4 },
    { parent_id: 3, user_id: 5 },
    { parent_id: 4, user_id: 6 },
  ]));

