import client from '../handlers/client'
import { DMChannel, Message } from 'discord.js'

import wordCatcher from '../features/wordCatcher'
import { timeToStr } from '../utils'

const prefix = process.env.PREFIX as string

export default async function (message: Message) {
  // Message Partial
  if (message.partial) {
    try {
      await message.fetch()
    } catch (e) {
      return client.log.error(`Message Partial error ${e}`)
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
    } catch (e) {
      return client.log.error(`Channel Partial error ${e}`)
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
      command.execute(message, args)
      // Cooldown
      timestamps!.set(author.id, now)
      setTimeout(() => timestamps!.delete(author.id), cooldownAmount)
    } catch (error: any) {
      client.log.error(`${error}`)
      message.reply(`:x: An error occurred: ${error.message}`)
    }
  }
}
