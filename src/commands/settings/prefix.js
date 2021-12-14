const { Guild } = require('../../db')
const config = require('../../config')

module.exports = {
  name: 'prefix',
  description: "Changes Phobos' prefix.",
  args: true,
  usage: '<prefix>',
  guildOnly: true,
  permission: 'MANAGE_GUILD',
  cooldown: 5,
  async execute (message, args) {
    const item = await Guild.get(message.guild.id)

    if (args[0] === 'reset') {
      item.set('prefix', config.prefix)
      item.save()
      return message.reply(`Successfully reset prefix to \`${config.prefix}\``)
    }

    const prefix = args[0].slice(0, 5)
    item.set('prefix', prefix)
    item.save()
    message.reply(
      `Successfully set \`${prefix}\` as Phobos' prefix!\nIf you wish to reset it, please run \`${prefix}prefix reset\``
    )
  }
}
