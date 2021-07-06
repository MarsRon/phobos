import { Message } from 'discord.js'

export default {
  name: 'poop',
  alias: ['💩'],
  description: 'Poop 💩',
  async execute (message: Message) {
    message.react('💩')
    const msg = await message.reply('Poop 💩')
    msg.react('💩')
  }
}
