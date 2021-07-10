import { Message } from 'discord.js'
import config from 'config'
import emoji from 'emoji'

const { embed: { avatar, color, url }, invite, prefix, supportServer } = config

const helpEmbed = {
  embed: {
    fields: ([
      ['📂 Commands List', `\`${prefix}cmds <category|command>\``, false],
      ['✅ Help Page', url, false],
      ['Open-source', `[${emoji.github} GitHub repo](https://github.com/MarsRon/phobos)`],
      ['Developed by', `[${emoji.marsron} MarsRon](https://marsron.github.io)`],
      ['Invite link', `[${emoji.phobos} ${prefix}invite](${invite})`],
      ['Support server', `[${emoji.discord} Mars Hangout](${supportServer})`]
    ] as Array<[string, string, boolean]>)
      .map(([name, value, inline = true]) => ({ name, value, inline })),
    color,
    author: { name: 'Phobos Help Page', url, icon_url: avatar },
    footer: { text: 'Arguments usage: <required> [optional]' },
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
