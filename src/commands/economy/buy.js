const { User } = require('../../db')
const { getItem } = require('../../handlers/economy')

module.exports = {
  name: 'buy',
  description: 'Buy something from the store.',
  args: true,
  usage: '<item>',
  async execute (message, args) {
    const { author, prefix } = message

    const name = args[0]

    const item = getItem(name)
    if (!item) {
      return message.reply(
        `:x: Item not found. Use \`${prefix}store\` to see items for sale`
      )
    }

    const userItem = await User.get(author.id)
    const { wallet, inventory } = userItem.data()

    if (wallet < item.price) {
      return message.reply(
        `:x: You need ${item.price}$ to purchase ${
          item.name
        }, still lacking ${item.price - wallet}$`
      )
    }

    userItem.inc('wallet', -item.price)
    if (inventory[name] !== undefined) {
      inventory[name]++
    } else {
      inventory[name] = 1
    }
    userItem.set('inventory', inventory)
    userItem._doc.markModified('inventory')
    userItem.save()

    message.reply(
      `Successfully purchased ${item.name} for ${item.price}$! Use \`${prefix}inv\` to view your purchased items`
    )
  }
}
