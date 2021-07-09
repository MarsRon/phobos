import client from '../client'
import { DMChannel, Message } from 'discord.js'

import config from '../config'
import { timeToStr } from '../utils'
import wordCatcher from '../features/wordCatcher'

const { prefix, ownerID } = config

export default async function (message: Message) {
  // Message Partial
  if (message.partial) {
    try {
      await message.fetch()
    } catch (err: any) {
      return client.log.error(err)
    }
  }

  const { author, channel, content, webhookID } = message

  if (author.bot || webhookID) return

  if (!content.startsWith(prefix)) {
    return wordCatcher(message)
  }

  // DM Channel Partial
  if ((channel as DMChannel).partial) {
    try {
      await channel.fetch()
    } catch (err: any) {
      return client.log.error(err)
    }
  }

  // Getting command and arguments
  const args = content.slice(prefix.length).trim().split(/ +/)
  const command = client.getCmd(args.shift()!.toLowerCase())

  if (command) {
    // Cooldown check
    const now = Date.now()
    const timestamps = client.cooldowns.get(command.name)
    const userCooldown = timestamps!.get(author.id)
    const cooldownAmount = (command.cooldown || 1) * 1000

    if (userCooldown) {
      const timeLeft = userCooldown + cooldownAmount - now
      if (timeLeft > 0) {
        return message.reply(`:x: Please wait ${timeToStr(timeLeft)} before reusing this command`)
      }
    }

    // Guild only check
    if (command.guildOnly) {
      if (channel.type === 'dm') {
        return message.reply(':x: This command is unavailable in DMs')
      }
      // Permission check
      if (command.permission) {
        const perms = channel.permissionsFor(author)
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
      timestamps!.set(author.id, now)
      setTimeout(() => timestamps!.delete(author.id), cooldownAmount)

      await command.execute(message, args)
    } catch (err: any) {
      client.log.error(err)
      message.reply(`:x: An error occurred: ${err.message}
You should usually never see this message
Please send a report to <@${ownerID}> (${(await client.users.fetch(ownerID)).tag}) `)
    }
  }
}
