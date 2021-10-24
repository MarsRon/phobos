const { getMemberFromMessage, formatDate } = require('../../utils')
const config = require('../../config')

const { color, url } = config.embed

module.exports = {
  name: 'whois',
  alias: ['userinfo'],
  description: 'Displays information about a user.',
  guildOnly: true,
  async execute (message, args) {
    const member = await getMemberFromMessage(message, args[0])

    if (!member) {
      return message.reply(`:x: Couldn't find user ${args[0]}`)
    }

    const { user } = member

    message.reply({
      embeds: [
        {
          description: user.toString(),
          color,
          fields: [
            ['Joined server at', formatDate(member.joinedAt)],
            ['Created account at', formatDate(user.createdAt)],
            [
              `Roles [${member.roles.cache.size - 1}]`,
              member.roles.cache
                .filter(role => role.name !== '@everyone')
                .map(role => role.toString())
                .join(' '),
              false
            ]
          ].map(([name, value, inline = true]) => ({ name, value, inline })),
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
              format: 'png',
              dynamic: true,
              size: 4096
            })
          }
        }
      ]
    })
  }
}
