const { User } = require('../../db')
const { getUserFromMessage } = require('../../utils')
const { getItem } = require('../../handlers/economy')
const config = require('../../config')

const { color } = config.embed

function parseInventory (inventory) {
  const items = Object.entries(inventory).filter(e => e[1] > 0)
  if (items.length !== 0) {
    return items
      .map(([name, sum]) => [getItem(name), sum])
      .map(([item, sum], i) => {
        const multiple = sum === 1 ? '' : ` × ${sum.toLocaleString()}`
        return `${i + 1}. ${item.name}${multiple} (${(item.price * sum).toLocaleString()}$)`
      })
      .join('\n')
  }
  return '\\*empty\\*'
}

module.exports = {
  name: 'inventory',
  alias: ['inv'],
  description: "Check your inventory or a user's.",
  usage: '[user]',
  cooldown: 5,
  async execute (message, args) {
    const target = await getUserFromMessage(message, args[0])

    const item = await User.get(target.id)
    const inventory = item.get('inventory')

    const embed = {
      description: parseInventory(inventory),
      color,
      author: {
        name: `${target.username}'s Inventory`,
        icon_url: target.displayAvatarURL({ dynamic: true })
      }
    }

    message.reply({ embeds: [embed] })
  }
}
