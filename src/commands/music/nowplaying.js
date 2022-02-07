const config = require('../../config')
const { getQueueStatus } = require('../../utils')

const { avatar, color } = config.embed

module.exports = {
  name: 'nowplaying',
  alias: ['np'],
  description: 'Shows what song Phobos is currently playing.',
  guildOnly: true,
  async execute (message) {
    const queue = message.client.distube.getQueue(message)
    if (!queue) {
      return message.reply(
        `:x: **I am not playing music. Use** \`${message.prefix}play\`** to play some music!**`
      )
    }

    const { songs, formattedCurrentTime } = queue
    const { name, url, formattedDuration, user, thumbnail } = songs[0]

    message.reply({
      embeds: [
        {
          description: `[${name}](${url}) - ${formattedCurrentTime} / ${formattedDuration}

Requested by: <@${user.id}> (${user.tag})

${getQueueStatus(queue)}`,
          color,
          thumbnail: { url: thumbnail },
          author: {
            name: 'Now Playing ♪',
            url: config.embed.url,
            icon_url: avatar + '?size=32'
          }
        }
      ]
    })
  }
}
