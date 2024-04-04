const config = require('../../config')
const emoji = require('../../emoji.json')

const {
  embed: { avatar, color, url },
  invite,
  supportServer
} = config

module.exports = {
  name: 'help',
  alias: ['phobos', 'info'],
  description: 'Bring up the help message.',
  async execute (message) {
    const content = "Note: Phobos has not been under active development since 2023. I will continue to patch any major issues, but other than that, there will be no more major updates to the bot. Thank you for your understanding."
    const embed = {
      fields: [
        [
          '📂 Commands List',
          `\`${message.prefix}cmds <category|command>\``,
          false
        ],
        ['✅ Help Page', url, false],
        [
          'Open-source',
          `[${emoji.github} GitHub repo](https://github.com/MarsRon/phobos)`
        ],
        ['Developed by', `[${emoji.marsron} MarsRon](https://marsron.name.my)`],
        ['Invite link', `[${emoji.phobos} ${message.prefix}invite](${invite})`],
        ['Support server', `[${emoji.discord} Mars Hangout](${supportServer})`]
      ].map(([name, value, inline = true]) => ({ name, value, inline })),
      color,
      author: { name: 'Phobos Help Page', url, icon_url: avatar },
      footer: { text: 'Arguments usage: <required> [optional]' },
      thumbnail: { url: avatar + '?size=512' }
    }
    message.reply({ content, embeds: [embed] })
  }
}
