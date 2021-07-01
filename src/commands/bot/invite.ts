import { Message } from 'discord.js'
import config from '../../config'

const { embed: { avatar, color, url }, invite } = config

const inviteEmbed = {
  embed: {
    description: `[**Add me**](${invite}) to your server! 🎉`,
    color,
    author: { name: 'Invite Phobos', url, icon_url: avatar },
    footer: { text: "It's easy, fast, free & non-regrettable." }
  }
}

export default {
  name: 'invite',
  description: 'Add me to your server! 🎉',
  execute (message: Message) {
    message.reply(inviteEmbed)
  }
}
