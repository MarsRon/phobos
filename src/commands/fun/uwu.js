const { splitMessage } = require('discord.js').Util
const Uwuifier = require('uwuifier')

const uwu = new Uwuifier()

module.exports = {
  name: 'uwu',
  alias: ['owo'],
  description: 'Uwuifies your message.',
  args: true,
  usage: '<text>',
  async execute (message, args) {
    const uwuified = uwu
      .uwuifySentence(args.join(' '))
      .replace(/\(・`ω´・\)/g, '(・\\`ω´・)')
    for (const text of splitMessage(uwuified, { char: ['\n', ' '] })) {
      await message.reply(text)
    }
  }
}
