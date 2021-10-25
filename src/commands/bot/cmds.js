const { MessageEmbed } = require('discord.js')
const { Guild } = require('../../db')
const client = require('../../client')
const config = require('../../config')

const { avatar, color, url } = config.embed

const titleCase = s => s.charAt(0).toUpperCase() + s.slice(1)

function getEmbed (query, prefix) {
  const embed = new MessageEmbed().setColor(color)

  if (query) {
    const command = client.getCmd(query)
    if (command) {
      // Send command info
      return embed
        .setAuthor('Command Info', avatar, url)
        .setTitle(prefix + command.name)
        .setDescription(command.description)
        .addField(
          'Usage',
          `\`${prefix}${command.name}${
            command.usage ? ` ${command.usage}` : ''
          }\``,
          true
        )
        .addField(
          'Aliases',
          command.alias ? `\`${command.alias.join('` `')}\`` : 'None',
          true
        )
        .addField('Cooldown', `${command.cooldown ?? '1'} seconds`, true)
        .setFooter('Arguments usage: <required> [optional]')
    } else {
      // Send commands in category
      const category = client.commands.get(query)
      if (category) {
        return embed
          .setAuthor(`${titleCase(query)} Category`, avatar, url)
          .addFields(
            [...category.values()].map(({ name, description: value }) => ({
              name: prefix + name,
              value,
              inline: true
            }))
          )
      }
    }
  }

  // Send categories
  return embed
    .setAuthor('Phobos Commands', avatar, url)
    .addFields(
      [...client.commands.keys()].map(category => ({
        name: titleCase(category),
        value: `\`${prefix}cmds ${category}\``,
        inline: true
      }))
    )
    .setThumbnail(avatar + '?size=512')
}

module.exports = {
  name: 'cmds',
  alias: ['commands'],
  description: 'Shows information about a command/category.',
  usage: '<category|command>',
  async execute (message, args) {
    message.reply({
      embeds: [getEmbed(args[0], message.prefix)]
    })
  }
}
