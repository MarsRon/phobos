const client = require('../client')
const config = require('../config')
const { inspect } = require('util')

const { activity } = config

module.exports = function (guild) {
  const { log, user } = client
  user.setActivity(activity.name(client), activity.options)
  log.info(`Guild added: ${inspect(guild, { colors: true, depth: 1 })}`)
}
