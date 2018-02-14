const router = require('express').Router({ mergeParams: true });

const admin = require('../controllers/admin');

// Tournament API
router.get('/user', admin.user.list);
router.get('/user/:user_id', admin.user.get);

// router.post('/group', admin.group.create);
// router.patch('/group/:group_id/', admin.group.update);
// router.delete('/group/:group_id/', admin.group.delete);

module.exports = router;
