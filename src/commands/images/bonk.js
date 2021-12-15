const { MessageAttachment } = require('discord.js')
const jimp = require('jimp')
const path = require('path')
const { getUserFromMessage } = require('../../utils')

module.exports = {
  name: 'bonk',
  description: 'No horny!',
  args: true,
  usage: '<user>',
  cooldown: 5,
  async execute (message, args) {
    const bonkUser = await getUserFromMessage(message, args[0])
    const [bonkSauce, userAvatar, bonkAvatar] = await Promise.all([
      jimp.read(path.join(__dirname, '../../../assets/bonk.jpg')),
      jimp.read(message.author.displayAvatarURL({ format: 'png', size: 256 })),
      jimp.read(bonkUser.displayAvatarURL({ format: 'png', size: 256 }))
    ])

    userAvatar.circle()
    userAvatar.resize(165, 165)
    bonkSauce.composite(userAvatar, 125, 60)

    bonkAvatar.circle()
    bonkAvatar.resize(145, 145)
    bonkSauce.composite(bonkAvatar, 440, 240)

    const bonk = await bonkSauce.getBufferAsync('image/jpeg')

    message.reply({
      files: [new MessageAttachment(bonk, `${bonkUser.username}-bonk.jpg`)]
    })
  }
}
