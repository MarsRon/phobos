const { User } = require('../../db')
const { getUserFromMessage } = require('../../utils')

module.exports = {
  name: 'give-coins',
  description: 'Gives some coins to a user.',
  args: true,
  usage: '<user> <amount>',
  guildOnly: true,
  cooldown: 5,
  async execute (message, args) {
    if (message.author.id !== process.env.OWNER_ID) return

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
    message.reply(`**${target.displayName}** successfully received ${amount}$`)
  }
}
