import { Message } from 'discord.js'
import config from '../../config'

const { embed: { avatar, color, url }, invite, prefix, supportServer } = config

const helpEmbed = {
  embed: {
    fields: [
      ['📂 Commands List', `\`${prefix}cmds <category|command>\``],
      ['✅ Help Page', url],
      ['❓ Arguments usage', '`<required>`, `[optional]`'],
      ['📄 Still need help?', `[**Click here**](${supportServer}) to join our Discord server!`],
      ['✨ Add me!', `[${prefix}invite](${invite})`]
    ].map(([name, value]) => ({ name, value })),
    color,
    author: {
      name: 'Phobos Help Page',
      url,
      icon_url: avatar
    },
    thumbnail: { url: avatar + '?size=512' }
  }
}

export default {
  name: 'help',
  alias: ['phobos'],
  description: 'Bring up the help message.',
  execute (message: Message) {
    message.reply(helpEmbed)
  }
}
