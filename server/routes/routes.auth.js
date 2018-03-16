const router = require('express').Router({ mergeParams: true });

const auth = require('../controllers/controller.auth');

router.post('/login', auth.login);
// router.post('/register', auth.register);

module.exports = router;
