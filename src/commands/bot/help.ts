import { Message } from 'discord.js'
import config from '../../config'

const { embed: { avatar, color, url }, invite, prefix, supportServer } = config

const helpEmbed = {
  embed: {
    fields: ([
      ['📂 Commands List', `\`${prefix}cmds <category|command>\``],
      ['✅ Help Page', url],
      ['❓ Arguments usage', '`<required>`, `[optional]`'],
      ['Developed by', '[<:marsron:860010994486214667> MarsRon](https://marsron.github.io)', true],
      ['Invite link', `[<:phobos:860008684952485928> ${prefix}invite](${invite})`, true],
      ['Support server', `[<:discord:860008685102170142> Mars Hangout](${supportServer})`, true]
    ] as any[][]).map(([name, value, inline]) => ({ name, value, inline })),
    color,
    author: { name: 'Phobos Help Page', url, icon_url: avatar },
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
