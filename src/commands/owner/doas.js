const { getMemberFromMessage } = require('../../utils')
const config = require('../../config')

const { ownerId } = config

module.exports = {
  name: 'doas',
  alias: ['sudo'],
  description: 'Run a command as a user.',
  args: true,
  usage: '<user> <command...>',
  guildOnly: true,
  cooldown: 5,
  async execute (message, args) {
    if (message.author.id !== ownerId) return

    const target = await getMemberFromMessage(message, args.shift())
    if (!target) {
      return message.reply(":x: User doesn't exist")
    }

    const command = args[0]
    if (!command) {
      return message.reply(':x: Missing command argument')
    }

    if (!args[0].startsWith(message.prefix)) {
      args[0] = message.prefix + args[0]
    }

    const msg = message
    msg.author = target.user
    msg.member = target
    msg.content = args.join(' ')
    message.channel.send(`Executing as ${msg.author.tag}...`)
    message.client.emit('messageCreate', msg)
  }
}
