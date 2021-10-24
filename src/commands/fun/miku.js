const axios = require('axios')
const config = require('../../config')

const { color } = config.embed

const apiUrl = 'https://miku-for.us/api/v2/random'

module.exports = {
  name: 'miku',
  alias: ['hatsune-miku'],
  description: 'Sends a random Hatsune Miku image!',
  cooldown: 5,
  async execute (message) {
    const res = await axios.get(apiUrl)
    message.reply({
      embeds: [
        {
          color,
          image: { url: res.data.url }
        }
      ]
    })
  }
}
