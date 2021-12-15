const { getUserFromMessage } = require('../../utils')

module.exports = {
  name: 'simprate',
  description: 'How much would someone simp?',
  usage: '[user]',
  async execute (message, args) {
    const user = await getUserFromMessage(message, args[0])
    const rate = Math.floor(Math.random() * 101)
    message.reply(`${user} (${user.tag}) is ${rate}% simp!`)
  }
}
