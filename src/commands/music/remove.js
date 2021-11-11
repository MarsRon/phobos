module.exports = {
  name: 'remove',
  alias: ['rm'],
  description: 'Removes a certain entry from the queue.',
  args: true,
  usage: '<song_index>',
  guildOnly: true,
  async execute (message, args) {
    const { client } = message
    const { songs } = client.distube.getQueue(message)
    if (!songs) {
      return message.reply(
        `:x: **I am not playing music. Use** \`${message.prefix}play\`** to play some music!**`
      )
    }
    if (songs.length === 0) {
      return message.reply(':x: No songs in queue')
    }
    const index = parseInt(args[0])
    if (!index || index <= 0 || index >= songs.length) {
      client.getCmd('queue').execute(message)
      return message.reply(':x: Please enter a number from the queue index')
    }
    if (index === 0) {
      return client.getCmd('skip').execute(message)
    }
    const song = songs.splice(index, 1)[0]
    message.reply(`**Removed** \`${song.name}\``)
  }
}
