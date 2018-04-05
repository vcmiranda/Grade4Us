const router = require('express').Router({ mergeParams: true });

const images = require('../../controllers/general/images');

// Images API
router.get('/getImageURLStudent/', images.getImageURLStudent);
router.post('/saveImageStudent/', images.saveImageStudent);

module.exports = router;
