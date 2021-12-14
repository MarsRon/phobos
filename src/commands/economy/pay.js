const { User } = require('../../db')
const { getMemberFromMessage } = require('../../utils')

module.exports = {
  name: 'pay',
  description: 'Pay someone (from wallet).',
  args: true,
  usage: '<user>',
  guildOnly: true,
  cooldown: 5,
  async execute (message, args) {
    const target = await getMemberFromMessage(message, args[0])
    const { author } = message

    if (target.id === author.id) {
      return message.reply(":x: You can't pay yourself")
    }

    const amount = parseInt(args[1])
    if (!amount || amount <= 0) {
      return message.reply(':x: Amount must be a whole number')
    }

    const [authorItem, targetItem] = await Promise.all([
      User.get(author.id),
      User.get(target.id)
    ])

    if (authorItem.get('wallet') - amount < 0) {
      return message.reply(":x: You don't have enough coins in your wallet")
    }

    authorItem.inc('wallet', -amount)
    authorItem.save()
    targetItem.inc('wallet', amount)
    targetItem.save()

    message.reply(`**${target}** successfully received ${amount}$`)
  }
}
