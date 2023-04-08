const { User } = require('../../db')
const { getMemberFromMessage } = require('../../utils')
const config = require('../../config')

const { color, url } = config.embed

module.exports = {
  name: 'balance',
  alias: ['bal', 'wallet'],
  description: "Check your coin balance or a user's.",
  usage: '[user]',
  cooldown: 5,
  async execute (message, args) {
    const member = await getMemberFromMessage(message, args[0])
    const { user } = member

    const item = await User.get(user.id)
    const { wallet, bank } = item.data()

    const embed = {
      fields: [
        ['Wallet', `${wallet}$`],
        ['Bank', `${bank}$`],
        ['Total', `${bank + wallet}$`]
      ].map(([name, value]) => ({ name, value, inline: true })),
      color,
      author: {
        name: `${member.displayName ?? user.username}'s Balance`,
        url,
        icon_url: user.displayAvatarURL()
      }
    }

    message.reply({ embeds: [embed] })
  }
}
