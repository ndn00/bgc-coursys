//index.js
//adapted from https://github.com/DayOnePl/dos-server/blob/master/config/index.js
//configuration details - can add test/production differention later

const path = require('path');

const environment = require('./environment/environment');

const defaults = {
  root: path.join(__dirname, '..')
}

module.exports = {
  environment: Object.assign({}, defaults, environment)
}
