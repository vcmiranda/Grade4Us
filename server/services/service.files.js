const fs = require('fs');

/**
 * exists, check if target image exists, return boolean
 */
const files = {
  exists(path) {
    return fs.existsSync(path);
  },
};

module.exports = files;
