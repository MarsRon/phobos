const { AttachmentBuilder } = require('discord.js')
const { getUserFromMessage } = require('../../utils')
const { Stonk, NotStonk } = require('discord-image-generation')

module.exports = {
  name: 'stonks',
  alias: ['stonk'],
  description: 'Stonks or not stonks?',
  usage: '[user]',
  cooldown: 10,
  async execute (message, args) {
    const user = await getUserFromMessage(message, args[0])
    const avatar = user.displayAvatarURL({ format: 'png', size: 256 })
    const stonks = await (Math.random() < 0.5
      ? new Stonk()
      : new NotStonk()
    ).getImage(avatar)
    message.reply({
      files: [
        new AttachmentBuilder(stonks, { name: `${user.username}-stonks.png` })
      ]
    })
  }
}
