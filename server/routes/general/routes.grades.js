const router = require('express').Router({ mergeParams: true });

const grades = require('../../controllers/general/grades');

router.get('/listGrade/', grades.listGrade);

module.exports = router;
