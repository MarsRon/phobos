const { AttachmentBuilder } = require('discord.js')
const { getUserFromMessage } = require('../../utils')
const { Delete } = require('discord-image-generation')

module.exports = {
  name: 'deletetrash',
  description: 'Are you sure you want to permanently delete this trash?',
  usage: '[user]',
  cooldown: 10,
  async execute (message, args) {
    const user = await getUserFromMessage(message, args[0])
    const avatar = user.displayAvatarURL({ format: 'png', size: 256 })
    const deleteTrash = await new Delete().getImage(avatar)
    message.reply({
      files: [
        new AttachmentBuilder(deleteTrash, {
          name: `${user.username}-delete-trash.png`
        })
      ]
    })
  }
}
