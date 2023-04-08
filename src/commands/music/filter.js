const filters = [
  '3d',
  'bassboost',
  'echo',
  'karaoke',
  'nightcore',
  'vaporwave',
  'flanger',
  'gate',
  'haas',
  'reverse',
  'surround',
  'mcompand',
  'phaser',
  'tremolo',
  'earwax'
]

module.exports = {
  name: 'filter',
  description: 'Change the music filter.',
  usage: '<filter>',
  guildOnly: true,
  async execute (message, args) {
    const { distube } = message.client
    const queue = distube.getQueue(message)
    const chosen = args[0]
    if (!queue) {
      return message.reply(
        `:x: **I am not playing music. Use** \`${message.prefix}play\`** to play some music!**`
      )
    }
    if (!filters.includes(chosen)) {
      return message.reply(
        `:x: Invalid filter\nAvailable filters: \`${filters.join('`, `')}\``
      )
    }
    if (queue.filters[0] === chosen) {
      queue.filters.clear()
    } else {
      queue.filters.set([chosen])
    }
    message.reply(
      `Current filter: ${queue.filters.size === 0 ? 'Off' : chosen}`
    )
  }
}
