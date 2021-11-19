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

    let mode = 0
    if (/s|song|1/.test(arg)) {
      mode = 1
    } else if (/q|queue|2/.test(arg)) {
      mode = 2
    }
    queue.repeatMode = mode
    message.reply(
      `Now looping ${mode ? (mode === 2 ? 'queue' : 'this song') : 'no loop'}`
    )
  }
}
