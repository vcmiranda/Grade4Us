const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const firebaseHelper = require('./service.firebase');
const userModel = require('../model/user');

function createJWT(user) {
  return new Promise((success, error) => {
    if (!user
    || !user.hasOwnProperty('user_id')
    || !user.hasOwnProperty('parent_id')
    || !user.hasOwnProperty('teacher_id')
    || !user.hasOwnProperty('admin_id')) {
      error('Invalid User');
    }

    const keyfile = path.join(global.base, './config/jwtRS256.key');
    const cert = fs.readFileSync(keyfile);
    const jwtoken = jwt.sign({
      data: {
        user_id: user.user_id,
        admin_id: user.admin_id,
        organizer_id: user.teacher_id,
        coach_id: user.parent_id,
      },
    }, cert, {
      algorithm: 'RS256',
    }, {
      expiresIn: '1h',
    });
    if (typeof jwtoken === 'string') {
      success(jwtoken);
    } else {
      error(false);
    }
  });
}

/**
 * @desc Takes a token and returns true if valid
 * @param {token} string The token of the user
 */
function validateToken(token) {
  return new Promise((success, error) => {
    const keyfile = path.join(global.base, './config/jwtRS256.key.pub');
    const cert = fs.readFileSync(keyfile);

    jwt.verify(token, cert, {
      algorithm: 'RS256',
    }, (err, decoded) => {
      if (err) {
        error(err);
      } else {
        success(decoded.data);
      }
    });
  });
}

const auth = {
  /**
   * @desc Takes an email and password, creates and returns a token
   * @param {email} string The email of the user
   * @param {password} string The password of the user
   */
  login(email, password) {
    return firebaseHelper.login(email, password)
    .then(user => userModel.get({ 'user.firebaseUID': user.uid }))
    .then(user => createJWT(user[0]));
  },
  /**
   * @desc Takes a token and params object and validates them
   * @param {token} string The token of the user
   * @param {params} object The params of the request
   */
  validate(token, params) {
    return validateToken(token)
    .then((decoded) => {
      for (const property in params) {
        if (decoded.hasOwnProperty(property)) {
          if (decoded[property].toString() !== params[property].toString()) {
            const e = new Error();
            e.name = 'AuthenticationError';
            e.message = 'Token properties did not match request parameters';
            throw e;
          }
        }
      }
    });
  },
};

module.exports = auth;
