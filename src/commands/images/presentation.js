const { MessageAttachment } = require('discord.js')
const { LisaPresentation } = require('discord-image-generation')

module.exports = {
  name: 'presentation',
  description: "Shut up I'm having a presentation",
  args: true,
  usage: '<text>',
  cooldown: 5,
  async execute (message, args) {
    let text = args.join(' ')
    if (text.length > 300) {
      text = text.slice(0, 297) + '...'
    }
    const presentation = await new LisaPresentation().getImage(text)
    message.reply({
      files: [
        new MessageAttachment(
          presentation,
          `${message.author.username}-presentation.png`
        )
      ]
    })
  }
}
