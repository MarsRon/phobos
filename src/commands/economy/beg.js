const { User } = require('../../db')

module.exports = {
  name: 'beg',
  description: "Beg for coins. You'll get 1-50 coins each time you beg.",
  cooldown: 15,
  async execute (message) {
    const item = await User.get(message.author.id)
    const wallet = Math.round(
      (Math.floor(Math.random() * 50) + 1) * item.get('multiplier')
    )
    item.inc('wallet', wallet)
    message.reply(`You begged and received ${wallet}$!`)
  }
}
