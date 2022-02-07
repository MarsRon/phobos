module.exports = {
  name: 'playtop',
  alias: ['pt', 'ptop'],
  description: 'Adds a song on the top of the queue.',
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

    const query = args.join(' ').replace(/^<(https?:\/\/\S+)>$/, '$1')
    message.reply(`:mag_right: **Searching** \`${query}\``)
    message.client.distube.play(vc, query, {
      position: 1,
      member,
      textChannel: channel,
      message
    })
  }
}
