const winston = require('winston');
const fs = require('fs');

const logDir = './server/logs'; // check for log directory
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.printf(info => `${new Date()} |   ${info.message}`)),
  transports: [
    new winston.transports.File({ filename: 'server/logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'server/logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.printf(info => `${info.message}`),
  }));
}

module.exports = logger;
