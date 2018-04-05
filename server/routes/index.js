const router = require('express').Router({ mergeParams: true });

// const auth = require('../middleware/middle.auth');
// // Handle all errors
// router.use(require('../middleware/middle.error'));

router.use('/api/auth/', require('./routes.auth'));

// Routes that require auth
// router.use('/api/admin/:admin_id', auth, require('./routes.admin'));
// router.use('/api/teacher/:teacher_id', auth, require('./routes.teacher'));
// router.use('/api/parent/:parent_id', auth, require('./routes.parent'));

router.use('/api/images/', require('./general/routes.images'));
router.use('/api/grades/', require('./general/routes.grades'));
router.use('/api/courses/', require('./general/routes.courses'));


module.exports = router;
