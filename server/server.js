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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(require('./routes'));

// Added static folder
app.use('/images/', express.static(path.join(__dirname, 'static/images')));

// Listen on port provided in config
app.listen(process.env.WEB_PORT || 8081);
logger.info(`Server started, listening on ${process.env.WEB_PORT || 8081}`);
