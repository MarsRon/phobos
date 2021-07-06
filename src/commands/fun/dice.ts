import { Message } from 'discord.js'

export default {
  name: 'dice',
  description: 'Throw a dice! :game_die:',
  usage: '[number of sides]',
  async execute (message: Message, args: string[]) {
    let number = 6

    if (args.length) {
      const n = parseInt(args[0])
      if (n >= 0 && n < Number.MAX_SAFE_INTEGER) {
        number = n
      }
    }

    message.reply(`You got a **${
      (
        Math.floor(Math.random() * number) + 1
      ).toLocaleString()
    }** :game_die:`)
  }
}
