const { User } = require('../../db')

module.exports = {
  name: 'withdraw',
  alias: ['wd'],
  description: 'Withdraw coins from your bank into your wallet.',
  args: true,
  usage: '<amount>',
  cooldown: 5,
  async execute (message, args) {
    const item = await User.get(message.author.id)
    const { bank } = item.data()

    if (bank <= 0) {
      return message.reply(':x: Not enough coins to withdraw')
    }

    const amount = args[0]
    let wdAmount = bank
    if (!/^a(?:ll)?$/.test(amount)) {
      const n = parseInt(amount)
      if (!n || n <= 0) {
        return message.reply(':x: withdraw amount must be a whole number')
      }
      wdAmount = Math.min(bank, n)
    }

    item.inc('bank', -wdAmount)
    item.inc('wallet', wdAmount)
    message.reply(`Withdrawn ${wdAmount}$ from bank`)
  }
}
