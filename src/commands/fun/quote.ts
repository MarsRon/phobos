import { Message } from 'discord.js'
import { getUserFromMessage } from '../../utils'
import config from '../../config'

const { embed: { color, url } } = config

export default {
  name: 'quote',
  description: 'Forge a fake a quote by someone.',
  args: true,
  usage: '<user> [quote]',
  guildOnly: true,
  async execute (message: Message, args: string[]) {
    const user = await getUserFromMessage(message, args.shift()!)
    message.channel.send({
      embed: {
        description: args.length === 0 ? '*blank*' : args.join(' '),
        color,
        author: {
          name: user.tag,
          url,
          icon_url: user.displayAvatarURL({ dynamic: true })
        },
        footer: { text: 'Sent • sometime' }
      }
    })
    message.delete()
  }
}
