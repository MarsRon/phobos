module.exports = {
  name: 'loop',
  description: 'Loop the currently playing song.',
  guildOnly: true,
  args: true,
  usage: '<off|song|queue>',
  execute (message, args) {
    const { distube } = message.client
    const queue = distube.getQueue(message)
    if (!queue) {
      return message.reply(
        `:x: **I am not playing music. Use** \`${message.prefix}play\`** to play some music!**`
      )
    }
    const arg = args[0]

    if (/s|song|1/.test(arg)) {
      queue.repeatMode = 1
    } else if (/q|queue|2/.test(arg)) {
      queue.repeatMode = 2
    } else {
      queue.repeatMode = 0
    }

    message.reply(
      `Now looping ${
        queue.repeatMode
          ? queue.repeatMode === 2
            ? 'queue'
            : 'this song'
          : 'no loop'
      }`
    )
  }
}
