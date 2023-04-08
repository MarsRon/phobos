const axios = require('axios').default
const { inspect } = require('util')

const endpoint = process.env.AQUA_URL || 'http://localhost:8003/aqua'

module.exports = {
  name: 'aqua',
  description: 'Generate random sentences from KonoSuba!',
  async execute (message) {
    try {
      const res = await axios.get(endpoint)
      const { response } = res.data
      message.reply(`Aqua: ${response.slice(0, 3994)}`)
    } catch (error) {
      const { author, client, guild } = message
      client.log.error(error)
      /*
      client.logChannel.send({
        embeds: [
          {
            title: `${guild?.name ?? `DM ${author.tag}`} Error`,
            description: '```js\n' + inspect(error).slice(0, 4086) + '```',
            url: message.url,
            color: 0xff0000,
            fields: [
              ['User', `${author} (${author.tag})`],
              guild
                ? ['Guild', `${guild.name} (${guild.id})`]
                : ['DM', `${author} (${author.tag})`]
            ].map(([name, value]) => ({ name, value, inline: true }))
          }
        ]
      })
      */
      message.reply(
        ':x: Sorry, something went wrong. Please try again later ¯\\_(ツ)_/¯'
      )
    }
  }
}
