import { Message } from 'discord.js'
import { getMemberFromMessage, formatDate } from 'utils'
import config from 'config'

const { embed: { color, url } } = config

export default {
  name: 'whois',
  alias: ['userinfo'],
  guildOnly: true,
  async execute (message: Message, args: string[]) {
    const member = await getMemberFromMessage(message, args[0])

    if (!member) {
      return message.reply(`:x: Couldn't find user ${args[0]}`)
    }

    const { user } = member

    message.reply({
      embed: {
        description: user.toString(),
        color,
        fields: ([
          ['Joined server at', formatDate(member.joinedAt!)],
          ['Created account at', formatDate(user.createdAt)],
          [
            `Roles [${member.roles.cache.size - 1}]`,
            member.roles.cache
              .filter(role => role.name !== '@everyone')
              .map(role => role.toString()).join(' '),
            false
          ]
        ] as Array<[string, string, boolean?]>).map(
          ([name, value, inline = true]) => ({ name, value, inline })
        ),
        author: {
          name: user.tag,
          url,
          icon_url: user.displayAvatarURL({ dynamic: true })
        },
        footer: {
          text: `ID: ${user.id}`
        },
        timestamp: Date.now(),
        thumbnail: {
          url: user.displayAvatarURL({
            format: 'png', dynamic: true, size: 4096
          })
        }
      }
    })
  }
}
