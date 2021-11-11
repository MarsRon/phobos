module.exports = {
  name: 'slowmode',
  description: 'Sets the slowmode time for a channel.',
  args: true,
  usage: '<seconds> [channel]',
  guildOnly: true,
  permission: 'MANAGE_CHANNELS',
  execute (message, args) {
    const { channel, guild, mentions } = message

    const rate = parseInt(args.shift())
    if (isNaN(rate) || rate > 21600 || rate < 0) {
      message.reply(':x: Slowmode rate must be a number from 0 to 21600')
      return
    }

    const target =
      mentions.channels.first() ?? guild.channels.cache.get(args[0]) ?? channel

    target.setRateLimitPerUser(rate)
    message.reply(`${target} slowmode set to ${rate}s`)
  }
}
