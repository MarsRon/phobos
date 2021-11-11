module.exports = {
  name: 'play',
  alias: ['p'],
  description: 'Plays a song with the given name or URL.',
  args: true,
  usage: '<link|query>',
  guildOnly: true,
  execute (message, args) {
    if (!message.member.voice.channelId) {
      return message.reply(
        ':x: **You have to be in a voice channel to use this command**'
      )
    }

    const query = args.join(' ')
    message.reply(`:mag_right: **Searching** \`${query}\``)
    message.client.distube.play(message, query)
  }
}
