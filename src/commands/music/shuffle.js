module.exports = {
  name: 'shuffle',
  description: 'Shuffles the music queue.',
  guildOnly: true,
  async execute (message) {
    const { distube } = message.client
    const queue = distube.getQueue(message)
    if (!queue) {
      return message.reply(
        `:x: **I am not playing music. Use** \`${message.prefix}play\`** to play some music!**`
      )
    }
    distube.shuffle(message)
    message.reply(
      `Queue shuffled. Use \`${message.prefix}queue\` to view the music queue!`
    )
  }
}
