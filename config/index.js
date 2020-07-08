const path = require('path');

const environment = require('./environment/environment');

const defaults = {
  root: path.join(__dirname, '..')
}

module.exports = {
  environment: Object.assign({}, defaults, environment)
}
