const { User } = require('../../db')
const { getUserFromMessage } = require('../../utils')
const config = require('../../config')

const { ownerId } = config

module.exports = {
  name: 'give-coins',
  description: 'Gives some coins to a user.',
  args: true,
  usage: '<user> <amount>',
  guildOnly: true,
  cooldown: 5,
  async execute (message, args) {
    if (message.author.id !== ownerId) return

    const target = await getUserFromMessage(message, args[0])
    if (!target) {
      return message.reply(":x: User doesn't exist")
    }

    const amount = parseInt(args[1])
    if (!amount) {
      return message.reply(':x: Amount must be a integer')
    }

    const item = await User.get(target.id)
    item.inc('wallet', amount)
    item.save()
    message.reply(`**${target.username}** successfully received ${amount}$`)
  }
}
