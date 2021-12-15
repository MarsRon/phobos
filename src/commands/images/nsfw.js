const { MessageAttachment } = require('discord.js')
const jimp = require('jimp')
const path = require('path')

module.exports = {
  name: 'nsfw',
  alias: ['hentai', 'porn'],
  description: ':smirk:',
  cooldown: 5,
  async execute (message) {
    const { author, client } = message
    const [bonkSauce, userAvatar, bonkAvatar] = await Promise.all([
      jimp.read(path.join(__dirname, '../../../assets/bonk.jpg')),
      jimp.read(client.user.displayAvatarURL({ format: 'png', size: 256 })),
      jimp.read(author.displayAvatarURL({ format: 'png', size: 256 }))
    ])

    userAvatar.circle()
    userAvatar.resize(165, 165)
    bonkSauce.composite(userAvatar, 125, 60)

    bonkAvatar.circle()
    bonkAvatar.resize(145, 145)
    bonkSauce.composite(bonkAvatar, 440, 240)

    const bonk = await bonkSauce.getBufferAsync('image/jpeg')

    message.reply({
      content: 'No horny!',
      files: [new MessageAttachment(bonk, `${author.username}-bonk.jpg`)]
    })
  }
}
