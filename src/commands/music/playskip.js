module.exports = {
  name: 'playskip',
  alias: ['ps', 'pskip'],
  description: 'Skips the current song and plays the song you requested.',
  args: true,
  usage: '<link|query>',
  guildOnly: true,
  execute (message, args) {
    const { member, channel } = message
    const vc = member.voice?.channel
    
    if (!vc) {
      return message.reply(
        ':x: **You have to be in a voice channel to use this command**'
      )
    }

    const query = args.join(' ').replace(/^<.+>$/, '$1')
    message.reply(`:mag_right: **Searching** \`${query}\``)
    message.client.distube.play(vc, query, {
      skip: true,
      member,
      textChannel: channel,
      message
    })
  }
}
