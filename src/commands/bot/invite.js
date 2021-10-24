const config = require('../../config')

const {
  embed: { avatar, color, url },
  invite
} = config

const inviteEmbed = {
  description: `[**Add me**](${invite}) to your server! 🎉`,
  color,
  author: { name: 'Invite Phobos', url, icon_url: avatar },
  footer: { text: "It's easy, fast, free & non-regrettable." }
}

module.exports = {
  name: 'invite',
  description: 'Add me to your server! 🎉',
  execute (message) {
    message.reply({ embeds: [inviteEmbed] })
  }
}
