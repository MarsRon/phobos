const { getUserFromMessage } = require('../../utils')
const config = require('../../config')

const { color } = config.embed

module.exports = {
  name: 'avatar',
  alias: ['av', 'pfp'],
  description: 'Fetches the avatar/profile picture of a user.',
  usage: '[user]',
  async execute (message, args) {
    const user = await getUserFromMessage(message, args[0])

    const url = user.displayAvatarURL({
      format: 'png',
      dynamic: true,
      size: 4096
    })

    message.reply({
      embeds: [
        {
          title: 'Avatar',
          url,
          color,
          author: {
            name: user.tag,
            url,
            icon_url: url
          },
          image: { url }
        }
      ]
    })
  }
}
