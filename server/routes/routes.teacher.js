const router = require('express').Router({ mergeParams: true });

const teacher = require('../controllers/teacher/teacher');

// // Group API
router.get('/get', teacher.get);
router.get('/list', teacher.list);
// router.post('/group/', teacher.group.create);
// router.patch('/group/:group_id/', teacher.group.update);
// router.delete('/group/:group_id/', teacher.group.delete);

module.exports = router;
