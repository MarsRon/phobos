const { User } = require('../../db')
const config = require('../../config')

const { avatar, color, url } = config.embed

module.exports = {
  name: 'rich',
  alias: ['baltop'],
  description: 'See who the richest users of Phobos are!',
  cooldown: 15,
  async execute (message) {
    const data = await User.getAll()
    const top = data
      // Sort descending by sum
      .sort(
        (a, b) =>
          b.get('wallet') + b.get('bank') - a.get('wallet') - a.get('bank')
      )
      // Get first 10
      .slice(0, 10)
      // Format to string
      .map(async (item, index) => {
        const { id, wallet, bank } = item.data()
        let tag = ':x: User not found.'
        try {
          tag = (await message.client.users.fetch(id)).tag
        } catch {}
        const sum = (wallet + bank).toLocaleString()
        const emoji = [':first_place:', ':second_place:', ':third_place:']
        return `${emoji[index] ?? '🔹'} **${sum}$** - ${tag}`
      })

    const embed = {
      description: (await Promise.all(top)).join('\n'),
      color,
      author: {
        name: 'Top 10 Richest Users Of Phobos',
        url,
        icon_url: avatar + '?size=32'
      },
      footer: { text: 'NOTE: This does not include inventory items.' }
    }

    message.reply({ embeds: [embed] })
  }
}
