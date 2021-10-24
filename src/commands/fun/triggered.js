const { MessageAttachment } = require('discord.js')
const { getUserFromMessage } = require('../../utils')
const axios = require('axios')

module.exports = {
  name: 'triggered',
  description: "I'm triggered. >:(\n*Wait for a few seconds it's pretty slow*",
  usage: '[user]',
  cooldown: 5,
  async execute (message, args) {
    const user = await getUserFromMessage(message, args[0])
    const avatar = user.displayAvatarURL({ format: 'png', size: 256 })
    const { data } = await axios.get(
      'https://some-random-api.ml/canvas/triggered',
      {
        responseType: 'arraybuffer',
        params: { avatar }
      }
    )
    message.reply({
      files: [
        new MessageAttachment(data, `${user.username}-triggered.gif`)
      ]
    })
  }
}
