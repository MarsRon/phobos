const { timeToDHMS } = require('../../utils')
const config = require('../../config')

const { avatar, color, url } = config.embed

module.exports = {
  name: 'ping',
  alias: ['uptime'],
  description: "Checks the bot's latency.",
  execute (message) {
    const { uptime, ws } = message.client
    message.reply(':ping_pong: Pong!').then(msg =>
      msg.edit({
        embeds: [
          {
            fields: [
              [
                'Bot Latency',
                `${msg.createdTimestamp - message.createdTimestamp}ms`
              ],
              ['Websocket Ping', `${Math.round(ws.ping)}ms`],
              ['Uptime', timeToDHMS(uptime)]
            ].map(([name, value]) => ({ name, value, inline: true })),
            color,
            author: { name: 'Phobos Ping & Latency', url, icon_url: avatar }
          }
        ]
      })
    )
  }
}
