const client = require('../client')
const { Guild } = require('../db')
const config = require('../config')
const { timeToStr } = require('../utils')
const wordCatcher = require('../features/wordCatcher')
const { inspect } = require('util')

const { ownerId } = config

module.exports = async function (message) {
  // Message Partial
  if (message.partial) {
    try {
      await message.fetch()
    } catch (err) {
      return client.log.error(err)
    }
  }

  const { author, channel, content, guild, member, webhookId } = message

  if (author.bot || webhookId) return

  const prefix = (await Guild.get(guild.id)).get('prefix')
  message.prefix = prefix

  if (!content.startsWith(prefix)) {
    return wordCatcher(message)
  }

  // DM Channel Partial
  if (channel.partial) {
    try {
      await channel.fetch()
    } catch (err) {
      return client.log.error(err)
    }
  }

  // Getting command and arguments
  const args = content
    .slice(prefix.length)
    .trim()
    .split(/ +/)
  const command = client.getCmd(args.shift().toLowerCase())

  if (command) {
    // Make the user know the bot is responding
    channel.sendTyping()

    // Cooldown check
    const now = Date.now()
    const timestamps = client.cooldowns.get(command.name)
    const userCooldown = timestamps.get(author.id)
    const cooldownAmount = (command.cooldown ?? 3) * 1000

    if (userCooldown) {
      const timeLeft = userCooldown + cooldownAmount - now
      if (timeLeft > 0) {
        return message.reply(
          `:x: Please wait ${timeToStr(timeLeft)} before reusing this command`
        )
      }
    }

    // Guild only check
    if (command.guildOnly) {
      if (channel.type === 'dm') {
        return message.reply(':x: This command is unavailable in DMs')
      }
      // Permission check
      if (command.permission) {
        const perms = channel.permissionsFor(member)
        if (!(perms && perms.has(command.permission))) {
          return message.reply(':x: Missing permission')
        }
      }
    }

    // Arguments check
    if (command.args && !args.length) {
      let reply = ':x: No arguments provided'
      if (command.usage) {
        reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``
      }
      return message.reply(reply)
    }

    // Execute command
    try {
      // Cooldown
      timestamps.set(author.id, now)
      if (author.id !== ownerId) {
        setTimeout(() => timestamps.delete(author.id), cooldownAmount)
      }

      await command.execute(message, args)
    } catch (error) {
      client.log.error(error)
      message.reply(
        ':x: Sorry, something went wrong. Please try again later ¯\\_(ツ)_/¯'
      )
      client.logChannel.send({
        embeds: [
          {
            title: `${message.guild?.name ?? `DM ${author.tag}`} Error`,
            description: '```js\n' + inspect(error).slice(0, 4086) + '```',
            url: message.url,
            color: 0xff0000,
            fields: [
              ['User', `${author} (${author.tag})`],
              guild
                ? ['Guild', `${guild.name} (${guild.id})`]
                : ['DM', `${author} (${author.tag})`]
            ].map(([name, value]) => ({ name, value, inline: true }))
          }
        ]
      })
    }
  }
}
