const petPetGif = require('pet-pet-gif')
const { MessageAttachment } = require('discord.js')
const { getUserFromMessage } = require('../../utils')

module.exports = {
  name: 'petpet',
  description: 'Pwease pet pet me UwU',
  usage: '[user]',
  cooldown: 5,
  async execute (message, args) {
    const user = await getUserFromMessage(message, args[0])
    const avatar = user.displayAvatarURL({ format: 'png', size: 256 })
    const petpet = await petPetGif(avatar)
    message.reply({
      files: [new MessageAttachment(petpet, `${user.username}-petpet.gif`)]
    })
  }
}
