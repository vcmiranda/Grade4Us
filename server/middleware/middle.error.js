const logger = require('../services/service.logging');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const message = 'Oh no! Something went terribly wrong. If this problem reoccurs contact our support team and give them this information: \n\n';

  if (err.name === 'QueryError') {
    // Query Error
    res.status(500).send(`${message}Error code OFFSIDE | Time: ${new Date()}`);
  } else if (err.name === 'DatabaseError') {
    // Database Error
    res.status(500).send(`${message}Error code FOUL | Time: ${new Date()}`);
  } else if (err.name === 'ConnectionError') {
    // Connection Error
    res.status(500).send(`${message}Error code PENALTY | Time: ${new Date()}`);
  } else if (err.name === 'JsonWebTokenError') {
    // Token Error
    res.status(401).send('You did not provide a valid authentication token.');
  } else if (err.name === 'AuthenticationError') {
    // Authentication Error
    res.status(401).send('You do not have access to this resource.');
  } else {
    res.status(500).send('Oh no! Something went terribly wrong');
  }

  logger.error(`${err}`);
};
