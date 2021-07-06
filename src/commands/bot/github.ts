import { Message } from 'discord.js'

export default {
  name: 'github',
  alias: ['repo'],
  description: "Phobos' open-source GitHub repo.",
  execute (message: Message) {
    message.reply('https://github.com/MarsRon/phobos')
  }
}
