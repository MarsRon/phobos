import { Message } from 'discord.js'
import { timeToDHMS } from '@phobos/utils'
import config from '@phobos/config'

const { avatar, color, url } = config.embed

export default {
  name: 'ping',
  alias: ['uptime'],
  description: "Checks the bot's latency.",
  execute (message: Message) {
    const { uptime, ws } = message.client
    message.reply(':ping_pong: Pong!').then(msg => msg.edit({
      embed: {
        fields: [
          ['Bot Latency', `${msg.createdTimestamp - message.createdTimestamp}ms`],
          ['Websocket Ping', `${Math.round(ws.ping)}ms`],
          ['Uptime', timeToDHMS(uptime!)]
        ].map(([name, value]) => ({ name, value, inline: true })),
        color,
        author: { name: 'Phobos Ping & Latency', url, icon_url: avatar }
      }
    }))
  }
}
