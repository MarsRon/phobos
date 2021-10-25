const { User } = require('../../db')

module.exports = {
  name: 'deposit',
  alias: ['dep'],
  description: 'Deposit coins into your bank from your wallet.',
  args: true,
  usage: '<amount>',
  cooldown: 5,
  async execute (message, args) {
    const item = await User.get(message.author.id)
    const { wallet } = item.data()

    if (wallet <= 0) {
      return message.reply(':x: Not enough coins to deposit')
    }

    const amount = args[0]
    let depAmount = wallet
    if (!/^a(?:ll)?$/.test(amount)) {
      const n = parseInt(amount)
      if (!n || n <= 0) {
        return message.reply(':x: Deposit amount must be a whole number')
      }
      depAmount = Math.min(wallet, n)
    }

    item.inc('wallet', -depAmount)
    item.inc('bank', depAmount)
    message.reply(`Deposited ${depAmount}$ into bank`)
  }
}
