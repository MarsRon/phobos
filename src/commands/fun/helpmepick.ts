import { Message } from 'discord.js'

export default {
  name: 'helpmepick',
  description: 'Let Phobos help you pick something. Add ` or ` between your choices.',
  args: true,
  usage: '<a or b or c or ...>',
  execute (message: Message, args: string[]) {
    const choices = args.join(' ').split(/ or /)
    message.reply(choices[Math.floor(Math.random() * choices.length)])
  }
}
