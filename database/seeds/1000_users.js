exports.seed = knex => knex('user').del()
  .then(() => knex('user').insert([
    { user_id: 1, firebaseUID: '1jjDlTiDuVXXjIt92JMDGyHfZuq2', firstname: 'Admin', lastname: 'User', email: 'admin@test.com' },
    { user_id: 2, firebaseUID: 'wqY9ic50Rkazh6NeU4lmBfUlO9C3', firstname: 'Teacher', lastname: 'User', email: 'teacher@test.com' },
    { user_id: 3, firebaseUID: 'cPq32LJGOlUW8mfsks1sS9vmArf1', firstname: 'Parent', lastname: 'User', email: 'parent@test.com' },
    { user_id: 4, firebaseUID: 'Jv3yJ1akphd09SOImcNcW8VdB1S2', firstname: 'Vitor', lastname: 'Miranda', email: 'vitorcomiranda@gmail.com' },
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
  ]))
  .then(() => knex('parent').del())
  .then(() => knex('parent').insert([
    { parent_id: 1, user_id: 3 },
  ]));

