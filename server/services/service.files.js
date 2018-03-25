const fse = require('fs-extra');

/**
 * exists, check if target image exists, return boolean
 */
const files = {
  exists(path) {
    return fse.pathExistsSync(path);
  },
};

module.exports = files;
