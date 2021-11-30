const axios = require('axios').default
const config = require('../../config')

const { avatar, color, url } = config.embed

module.exports = {
  name: 'advice',
  description: 'Why get random advice from a bot? Because why not ¯\\_(ツ)_/¯',
  cooldown: 3,
  async execute (message) {
    try {
      const { data } = await axios.get('https://api.adviceslip.com/advice')

      const embed = {
        description: data.slip.advice,
        color,
        author: {
          name: 'idk some advice i guess',
          url,
          icon_url: avatar
        }
      }

      message.reply({ embeds: [embed] })
    } catch (error) {
      message.client.log.error(error)
      message.reply(
        ':x: Sorry, something went wrong. Please try again later ¯\\_(ツ)_/¯'
      )
    }
  }
}
