const { formatDate } = require('../../utils')
const config = require('../../config')

const { avatar, color, url } = config.embed

module.exports = {
  name: 'serverinfo',
  description: 'Displays information about the server.',
  guildOnly: true,
  execute (message) {
    const { guild } = message
    const { name, memberCount, ownerId, channels } = guild

    message.reply({
      embeds: [
        {
          fields: [
            ['Owner', `<@${ownerId}>`],
            ['Created at', formatDate(guild.createdAt)],
            ['Members', memberCount.toLocaleString()],
            ['Channel Count', channels.cache.size.toLocaleString()]
          ].map(([name, value]) => ({ name, value, inline: true })),
          color,
          author: { name, url, icon_url: avatar },
          image: { url: guild.bannerURL({ size: 4096 }) },
          thumbnail: { url: guild.iconURL({ dynamic: true, size: 4096 }) }
        }
      ]
    })
  }
}
