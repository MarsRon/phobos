const { User } = require('../../db')
const config = require('../../config')

const { avatar, color, url } = config.embed

module.exports = {
  name: 'rich',
  alias: ['baltop'],
  description: 'See who the richest users of Phobos are!',
  cooldown: 15,
  async execute (message) {
    const emoji = [':first_place:', ':second_place:', ':third_place:']
    const data = await User.getAll()
    const top = data
      .sort(
        (a, b) =>
          b.get('wallet') + b.get('bank') - a.get('wallet') - a.get('bank')
      )
      .slice(0, 10)
      .map(async (item, index) => {
        const { id, wallet, bank } = item.data()
        let user
        try {
          user = await message.client.users.fetch(id)
        } catch (e) {
          user = { tag: ':x: User not found.' }
        }
        return `${emoji[index] ?? '🔹'} **${(
          wallet + bank
        ).toLocaleString()}$** - ${user.tag}`
      })
    message.reply({
      embeds: [
        {
          description: (await Promise.all(top)).join('\n'),
          color,
          author: {
            name: 'Top 10 Richest Users Of Phobos',
            url,
            icon_url: avatar + '?size=32'
          },
          footer: { text: 'NOTE: This does not include inventory items.' }
        }
      ]
    })
  }
}
