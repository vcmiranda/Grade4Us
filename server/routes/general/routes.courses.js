const router = require('express').Router({ mergeParams: true });

const courses = require('../../controllers/general/courses');

router.get('/listCourse/', courses.listCourse);
router.post('/updateCourse/', courses.updateCourse);

module.exports = router;
