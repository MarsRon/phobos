const { AttachmentBuilder } = require('discord.js')
const { getUserFromMessage } = require('../../utils')
const { Bobross } = require('discord-image-generation')

module.exports = {
  name: 'bobross',
  description: 'Bobross is painting something amazing!',
  usage: '[user]',
  cooldown: 10,
  async execute (message, args) {
    const user = await getUserFromMessage(message, args[0])
    const avatar = user.displayAvatarURL({ extension: 'png', size: 256 })
    const bobross = await new Bobross().getImage(avatar)
    message.reply({
      files: [
        new AttachmentBuilder(bobross, { name: `${user.username}-bobross.png` })
      ]
    })
  }
}
