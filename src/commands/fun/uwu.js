const { splitMessage } = require('../../utils')
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
      .replaceAll('(・`ω´・)', '(・\\`ω´・)')
    for (const text of splitMessage(uwuified, { char: ['\n', ' '] })) {
      await message.reply(text)
    }
  }
}
