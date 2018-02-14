const router = require('express').Router({ mergeParams: true });
// const auth = require('../middleware/middle.auth');

// router.use('/api/auth/', require('./routes.auth'));

// Routes that require auth
// router.use('/api/admin/:admin_id', auth, require('./routes.admin'));
// router.use('/api/teacher/:teacher_id', auth, require('./routes.teacher'));
// router.use('/api/parent/:parent_id', auth, require('./routes.parent'));

router.use('/api/admin/:admin_id', require('./routes.admin'));


// Handle all errors
router.use(require('../middleware/middle.error'));

module.exports = router;
