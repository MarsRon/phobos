module.exports = {
  name: 'skip',
  alias: ['s'],
  description: 'Skips the current playing song.',
  guildOnly: true,
  async execute (message) {
    const { distube } = message.client
    const queue = distube.getQueue(message)
    if (!queue) {
      return message.reply(
        `:x: **I am not playing music. Use** \`${message.prefix}play\`** to play some music!**`
      )
    }
    distube.skip(message)
    message.reply('**Skipped song**')
  }
}
