const client = require('../client')

module.exports = function (warning) {
  client.log.warn(warning)
}
