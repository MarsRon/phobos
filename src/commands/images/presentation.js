const { AttachmentBuilder } = require('discord.js')
const { LisaPresentation } = require('discord-image-generation')

module.exports = {
  name: 'presentation',
  description: "Shut up I'm having a presentation",
  args: true,
  usage: '<text>',
  cooldown: 10,
  async execute (message, args) {
    let text = args.join(' ')
    if (text.length > 300) {
      text = text.slice(0, 297) + '...'
    }
    const presentation = await new LisaPresentation().getImage(text)
    message.reply({
      files: [
        new AttachmentBuilder(presentation, {
          name: `${message.author.username}-presentation.png`
        })
      ]
    })
  }
}
