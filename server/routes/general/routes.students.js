const router = require('express').Router({ mergeParams: true });

const students = require('../../controllers/general/students');

router.get('/get', students.get);
router.get('/list', students.list);
router.post('/create', students.create);
router.patch('/update', students.update);
router.delete('/delete', students.delete);

module.exports = router;
