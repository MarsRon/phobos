const { User } = require('../../db')
const { timeToStr } = require('../../utils')

module.exports = {
  name: 'daily',
  description: 'Get your daily free coins.',
  cooldown: 86400,
  async execute (message) {
    const item = await User.get(message.author.id)
    const { lastDaily, multiplier } = item.data()

    const now = Date.now()
    const expirationTime = lastDaily + 86400000
    const timeLeft = expirationTime - now
    if (timeLeft > 0) {
      return message.reply(
        `:x: Please wait ${timeToStr(timeLeft)} before reusing this command`
      )
    }

    const wallet = Math.round(200 * multiplier)
    item.inc('wallet', wallet)
    item.set('lastDaily', now)
    message.reply(
      `You received ${wallet}$! Run this command everyday to get your free coins!`
    )
  }
}
