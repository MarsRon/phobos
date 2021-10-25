const { Guild } = require('../../db')

module.exports = {
  name: 'prefix',
  description: "Changes Phobos' prefix.",
  args: true,
  usage: '<prefix>',
  guildOnly: true,
  permission: 'MANAGE_SERVER',
  cooldown: 5,
  async execute (message, args) {
    const item = await Guild.get(message.guild.id)
    if (args[0] === 'reset') {
      item.set('prefix', process.env.PREFIX)
      return message.reply(
        `Successfully reset prefix to \`${process.env.PREFIX}\``
      )
    }

    const prefix = args[0].slice(0, 5)

    item.set('prefix', prefix)
    message.reply(
      `Successfully set \`${prefix}\` as Phobos' prefix!\nIf you wish to reset it, please run \`${prefix}prefix reset\``
    )
  }
}
