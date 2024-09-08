module.exports = {
  name: 'disconnect',
  alias: ['dc', 'leave', 'dis', 'fuckoff', 'stop'],
  description: 'Disconnects the bot from the voice channel it is in.',
  guildOnly: true,
  async execute (message) {
    const { distube } = message.client
    const queue = distube.getQueue(message)
    if (!queue) {
      return message.reply(
        `:x: **I am not playing music. Use** \`${message.prefix}play\`** to play some music!**`
      )
    }
    queue.stop()
    queue.voice.leave()
    message.reply('**Successfully disconnected**')
  }
}
