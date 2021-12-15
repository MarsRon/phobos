const { MessageAttachment } = require('discord.js')
const { getUserFromMessage } = require('../../utils')
const { Triggered } = require('discord-image-generation')

module.exports = {
  name: 'triggered',
  description: "I'm triggered. >:(",
  usage: '[user]',
  cooldown: 5,
  async execute (message, args) {
    const user = await getUserFromMessage(message, args[0])
    const avatar = user.displayAvatarURL({ format: 'png', size: 256 })
    const triggered = await new Triggered().getImage(avatar)
    message.reply({
      files: [
        new MessageAttachment(triggered, `${user.username}-triggered.gif`)
      ]
    })
  }
}
