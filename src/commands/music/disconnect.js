module.exports = {
  name: 'disconnect',
  alias: ['dc', 'leave', 'dis', 'fuckoff', 'stop'],
  description: 'Disconnects the bot from the voice channel it is in.',
  guildOnly: true,
  async execute (message) {
    const { distube } = message.client
    if (!distube.getQueue(message)) {
      return message.reply(
        `:x: **I am not playing music. Use** \`${message.prefix}play\`** to play some music!**`
      )
    }
    distube.stop(message)
    message.reply('**Successfully disconnected**')
  }
}
