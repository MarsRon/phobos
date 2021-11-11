module.exports = {
  name: 'pause',
  description: 'Pauses the currently playing song.',
  guildOnly: true,
  async execute (message) {
    const { distube } = message.client
    const queue = distube.getQueue(message)
    if (!queue) {
      return message.reply(
        `:x: **I am not playing music. Use** \`${message.prefix}play\`** to play some music!**`
      )
    }
    distube.pause(message)
    message.reply('**Song paused**')
  }
}
