const axios = require('axios').default
const config = require('../../config')

const { color } = config.embed

module.exports = {
  name: 'miku',
  alias: ['hatsune-miku'],
  description: 'Sends a random Hatsune Miku image!',
  cooldown: 5,
  async execute (message) {
    try {
      const { data } = await axios.get('https://miku-for.us/api/v2/random')
      message.reply({
        embeds: [
          {
            color,
            image: { url: data.url }
          }
        ]
      })
    } catch (error) {
      message.client.log.error(error)
      message.reply(
        ':x: Sorry, something went wrong. Please try again later ¯\\_(ツ)_/¯'
      )
    }
  }
}
