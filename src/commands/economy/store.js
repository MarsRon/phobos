const { items } = require('../../handlers/economy')
const config = require('../../config')

const { color, avatar, url } = config.embed

const formatStoreItems = items =>
  Object.entries(items).map(([category, itemList]) => ({
    name: category,
    value: Object.entries(itemList)
      .map(([key, item]) => `\`${key}\` ${item.name} ${item.price}$ `)
      .join('\n')
  }))

module.exports = {
  name: 'store',
  description: 'Lists items for sale in the store.',
  async execute (message) {
    const embed = {
      description: `To buy an item, run \`${message.prefix}buy <item>\``,
      fields: formatStoreItems(items),
      color,
      author: {
        name: 'Phobos Store',
        url,
        icon_url: avatar
      }
    }
    message.reply({ embeds: [embed] })
  }
}
