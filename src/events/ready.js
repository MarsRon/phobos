const client = require('../client')
const config = require('../config')

const { activity, logChannelId } = config

module.exports = async function () {
  const { log, user } = client

  const setActivity = () => {
    user.setActivity(activity.name(client), activity.options)
  }
  setActivity()
  setInterval(setActivity, 60 * 60 * 1000)

  log.info(`${user.tag} is online`)

  client.logChannel = await client.channels.fetch(logChannelId)
}

module.exports.once = true
