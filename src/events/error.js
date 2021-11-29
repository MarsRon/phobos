const client = require('../client')

module.exports = function (error) {
  client.log.error(error)
}
