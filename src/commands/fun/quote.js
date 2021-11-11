const { getUserFromMessage } = require('../../utils')
const config = require('../../config')

const { color, url } = config.embed

module.exports = {
  name: 'quote',
  description: 'Forge a fake a quote by someone.',
  args: true,
  usage: '<user> [quote]',
  async execute (message, args) {
    const user = await getUserFromMessage(message, args.shift())
    message.channel.send({
      embeds: [
        {
          description: args.length === 0 ? '*blank*' : args.join(' '),
          color,
          author: {
            name: user.tag,
            url,
            icon_url: user.displayAvatarURL({ dynamic: true })
          },
          footer: { text: 'Sent • sometime' }
        }
      ]
    })
    message.delete().catch(message.client.log.error)
  }
}
