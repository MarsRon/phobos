import { Message, MessageEmbed } from 'discord.js'
import client from '../../handlers/client'
import config from '../../config'

const { embed: { avatar, color, url }, prefix } = config

const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

function getEmbed (query: string): MessageEmbed {
  if (query) {
    const command = client.getCmd(query)
    if (command) {
      // Send command info
      return new MessageEmbed()
        .setAuthor('Phobos', avatar, url)
        .setTitle(prefix + command.name)
        .setDescription(command.description)
        .setColor(color)
        .addField(
          'Usage',
          `\`${prefix}${command.name}${command.usage ? ` ${command.usage}` : ''}\``,
          true
        )
        .addField(
          'Aliases',
          command.alias ? `\`${command.alias.join('` `')}\`` : 'None',
          true
        )
        .addField(
          'Cooldown',
          `${command.cooldown ?? '1'} seconds`,
          true
        )
    } else {
      // Send commands in category
      const category = client.commands.get(query)
      if (category) {
        return new MessageEmbed()
          .setAuthor(`${titleCase(query)} Category`, avatar, url)
          .setColor(color)
          .addFields([...category.values()]
            .map(({ name, description: value }) =>
              ({ name: prefix + name, value, inline: true })
            )
          )
      }
    }
  }

  // Send categories
  return new MessageEmbed()
    .setAuthor('Phobos Commands', avatar, url)
    .setColor(color)
    .addFields(
      [...client.commands.keys()].map(category => ({
        name: titleCase(category),
        value: `\`${prefix}cmds ${category}\``,
        inline: true
      }))
    )
    .setThumbnail(avatar + '?size=512')
}

export default {
  name: 'cmds',
  alias: ['commands'],
  description: 'Shows information about a command/category.',
  usage: '<category|command>',
  execute (message: Message, args: string[]) {
    message.reply(getEmbed(args[0]))
  }
}
