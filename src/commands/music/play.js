module.exports = {
  name: 'play',
  alias: ['p'],
  description: 'Plays a song with the given name or URL.',
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
      member,
      textChannel: channel,
      message
    })
  }
}
