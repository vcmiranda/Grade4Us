const chai = require('chai');
chai.use(require('chai-http'));

const app = require('../server/server');
const agent = chai.request.agent('http://localhost:8081')

require('./api/login.js')(chai, agent).then(token => {
  require('./api/organizer.js')(chai, agent, token);
});



