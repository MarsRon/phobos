const axios = require('axios').default
const { inspect } = require('util')

const endpoint = process.env.KAZUMA_URL || 'http://localhost:8002/kazuma'

module.exports = {
  name: 'kazuma',
  alias: ['chatbot', 'chat'],
  description: 'Chat with a AI chatbot, Kazuma from KonoSuba!',
  args: true,
  usage: '<message>',
  cooldown: 10,
  async execute (message, args) {
    try {
      const {
        data: { response, compute_time }
      } = await axios.get(endpoint, {
        params: {
          message: args.join(' ')
        }
      })

      message.reply(
        `Kazuma: ${response}\nCompute time: ${compute_time.toFixed(3)}s`
      )
    } catch (error) {
      const { author, client, guild } = message
      client.log.error(error)
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
      message.reply(
        ':x: Sorry, something went wrong. Please try again later ¯\\_(ツ)_/¯'
      )
    }
  }
}
