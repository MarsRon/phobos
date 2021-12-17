const { MessageAttachment } = require('discord.js')
const { createCanvas, loadImage } = require('canvas')
const path = require('path')
const { getUserFromMessage } = require('../../utils')

const bonkPath = path.join(__dirname, '../../../assets/bonk.jpg')
let bonkSauce
loadImage(bonkPath).then(image => (bonkSauce = image))

module.exports = {
  name: 'nsfw',
  alias: ['hentai', 'porn'],
  description: ':smirk:',
  cooldown: 10,
  async execute (message) {
    const { author, client } = message

    const [userAvatar, bonkAvatar] = await Promise.all(
      [client.user, author].map(user =>
        loadImage(user.displayAvatarURL({ format: 'png', size: 256 }))
      )
    )

    const canvas = createCanvas(680, 463)
    const ctx = canvas.getContext('2d')
    ctx.save()

    ctx.drawImage(bonkSauce, 0, 0)

    ctx.arc(207.5, 142.5, 82.5, 0, Math.PI * 2)
    ctx.clip()
    ctx.drawImage(userAvatar, 125, 60, 165, 165)
    ctx.restore()

    ctx.arc(512.5, 312.5, 72.5, 0, Math.PI * 2)
    ctx.clip()
    ctx.drawImage(bonkAvatar, 440, 240, 145, 145)

    const bonk = canvas.toBuffer('image/jpeg')

    message.reply({
      content: 'No horny!',
      files: [new MessageAttachment(bonk, `${author.username}-bonk.jpg`)]
    })
  }
}
