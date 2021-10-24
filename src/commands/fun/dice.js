module.exports = {
  name: 'dice',
  description: 'Throw a dice! :game_die:',
  usage: '[number of sides]',
  async execute (message, args) {
    let dice = 6

    if (args.length) {
      const n = parseInt(args[0])
      if (n >= 0 && n < Number.MAX_SAFE_INTEGER) {
        dice = n
      }
    }

    message.reply(
      `You got a **${(
        Math.floor(Math.random() * dice) + 1
      ).toLocaleString()}** :game_die:`
    )
  }
}
