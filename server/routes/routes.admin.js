const router = require('express').Router({ mergeParams: true });

const admin = require('../controllers/admin');

// Tournament API
router.get('/user', admin.user.list);
router.get('/user/:user_id', admin.user.get);

module.exports = router;
