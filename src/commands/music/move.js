module.exports = {
  name: 'move',
  description: 'Moves a song from music queue.',
  guildOnly: true,
  args: true,
  usage: '<from> <to>',
  async execute (message, args) {
    const { distube } = message.client
    const queue = distube.getQueue(message)
    if (!queue) {
      return message.reply(
        `:x: **I am not playing music. Use** \`${message.prefix}play\`** to play some music!**`
      )
    }
    if (queue.songs.length <= 2) {
      return message.reply(":x: There's only one song in queue")
    }
    const from = parseInt(args.shift())
    const to = parseInt(args.shift())
    if (
      !(from && to) ||
      from <= 0 ||
      from > queue.songs.length ||
      to <= 0 ||
      to > queue.songs.length
    ) {
      return message.reply(
        `:x: Please enter integers from 1 to ${queue.songs.length - 1}`
      )
    }
    const song = queue.songs[from]
    queue.songs.splice(from, 1)
    queue.songs.splice(to, 0, song)
    message.reply(
      `Moved \`${song.name}\`. Use \`${message.prefix}queue\` to view the music queue!`
    )
  }
}
