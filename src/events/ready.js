const client = require('../client')
const config = require('../config')

const { activity, logChannelId } = config

module.exports = async function () {
  const { log, user } = client
  user.setActivity(activity.name(client), activity.options)
  log.info(`${user.tag} is online`)
  client.logChannel = await client.channels.fetch(logChannelId)
}

module.exports.once = true
