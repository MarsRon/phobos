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

    const query = args.join(' ').replace(/^<(https?:\/\/\S+)>$/, '$1')
    message.reply(`:mag_right: **Searching** \`${query}\``)
    message.client.distube.play(vc, query, {
      member,
      textChannel: channel,
      message
    })
    // Bug: PlayOptions.skip is not working
    // Skick: "This is reported before but I forgot to fix it. Will fix it in the next version."
    // https://discord.com/channels/732254550689316914/1260780674361593977/1261525712892985425
    // Note: This is a temporary workaround, stick to PlayOptions.skip after it has been fixed
    .then(() => message.client.distube.skip(message.guild))
  }
}
