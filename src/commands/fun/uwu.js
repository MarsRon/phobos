const Uwuifier = require('uwuifier')

const { uwuifySentence: uwu } = new Uwuifier()

module.exports = {
  name: 'uwu',
  alias: ['owo'],
  description: 'Uwuifies your message.',
  args: true,
  usage: '<text>',
  execute (message, args) {
    message.reply(uwu(args.join(' ')))
  }
}
