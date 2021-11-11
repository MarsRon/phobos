const client = require('../client')
const config = require('../config')

const { activity } = config

module.exports = function () {
  const { log, user } = client
  user.setActivity(activity.name(client), activity.options)
  log.info(`${user.tag} is online`)
}

module.exports.once = true
