const fse = require('fs-extra');

/**
 * exists, check if target image exists, return boolean
 */
const files = {
  exists(path) {
    console.log(path);

    console.log(fse.pathExistsSync(path));
    return fse.pathExistsSync(path);
  },
};

module.exports = files;
