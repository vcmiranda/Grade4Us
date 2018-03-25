const router = require('express').Router({ mergeParams: true });

const images = require('../controllers/general/images');

// Images API
router.get('/getImageStudent/', images.getImageStudent);
router.post('/saveImageStudent/', images.saveImageStudent);

module.exports = router;
