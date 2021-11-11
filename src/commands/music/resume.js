module.exports = {
  name: 'resume',
  description: 'Resumes the currently playing song.',
  guildOnly: true,
  async execute (message) {
    const { distube } = message.client
    const queue = distube.getQueue(message)
    if (!queue) {
      return message.reply(
        `:x: **I am not playing music. Use** \`${message.prefix}play\`** to play some music!**`
      )
    }
    distube.resume(message)
    message.reply('**Song resumed**')
  }
}
