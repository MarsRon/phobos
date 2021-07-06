import { Message } from 'discord.js'
import Uwuifier from 'uwuifier'

const uwu = new Uwuifier()

module.exports = {
  name: 'uwu',
  alias: ['owo'],
  description: 'Uwuifies your message.',
  args: true,
  usage: '<text>',
  execute (message: Message, args: string[]) {
    message.reply(
      uwu.uwuifySentence(args.join(' '))
    )
  }
}
