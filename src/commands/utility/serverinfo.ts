import { Message } from 'discord.js'
import config from 'config'

const { embed: { avatar, color, url } } = config

export default {
  name: 'serverinfo',
  description: 'Displays information about the server.',
  guildOnly: true,
  execute (message: Message) {
    const { guild } = message
    const { name, region, memberCount, ownerID, channels } = guild!

    message.reply({
      embed: {
        fields: [
          ['Members', memberCount.toLocaleString()],
          ['Owner', `<@${ownerID}>`],
          ['Region', region],
          ['Channel Count', channels.cache.size.toLocaleString()]
        ].map(([name, value]) => ({ name, value, inline: true })),
        color,
        author: { name, url, icon_url: avatar },
        image: { url: guild!.bannerURL({ size: 4096 })! },
        thumbnail: { url: guild!.iconURL({ dynamic: true, size: 4096 })! }
      }
    })
  }
}
