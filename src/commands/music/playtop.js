module.exports = {
  name: 'playtop',
  alias: ['pt', 'ptop'],
  description: 'Adds a song on the top of the queue.',
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
    message.client.distube.play(message, query, { unshift: true })
  }
}
