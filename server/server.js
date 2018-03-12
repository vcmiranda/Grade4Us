// node entry point
global.base = __dirname;

const path = require('path');
const fs = require('fs');

// logging
const logger = require('./services/service.logging');

// Express
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined', {
  stream: fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' }),
}));

// Express API
app.use(require('./routes'));

// Listen on port provided in config
app.listen(process.env.WEB_PORT || 8081);
logger.info(`Server started, listening on ${process.env.WEB_PORT || 8081}`);
