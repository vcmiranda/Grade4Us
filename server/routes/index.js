const router = require('express').Router({ mergeParams: true });

router.use('/api/auth/', require('./routes.auth'));

router.use('/api/images/', require('./general/routes.images'));
router.use('/api/grades/', require('./general/routes.grades'));
router.use('/api/courses/', require('./general/routes.courses'));
router.use('/api/students/', require('./general/routes.students'));

router.use('/api/teachers/', require('./routes.teacher'));


module.exports = router;
