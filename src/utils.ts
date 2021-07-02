import { GuildMember, Message, User } from 'discord.js'

/**
 * Format duration seconds into DHMS '1d 2h 3m 4s' string
 * @param {number} seconds - Duration in seconds
 * @returns {string}
 */
export function timeToDHMS (seconds: number): string {
  seconds /= 1000
  return `${~~(seconds / 86400)}d ${~~(seconds / 3600) % 24}h ${~~(seconds / 60) % 60}m ${~~(seconds) % 60}s`
}

/**
 * Format duration seconds into 'x hour(s) y minute(s) z second(s)' string
 * @param {number} seconds - Duration in seconds
 * @returns {string}
 */
export function timeToStr (seconds: number): string {
  seconds /= 1000
  let str = ''
  if (seconds >= 60) {
    if (seconds >= 3600) {
      const hour = ~~(seconds / 3600)
      str += `${hour} hour${hour !== 1 ? 's' : ''} `
      seconds %= 3600
    }
    const minute = ~~(seconds / 60)
    str += `${minute} minute${minute !== 1 ? 's' : ''} `
    seconds %= 60
  }
  str += `${seconds.toFixed(0)} second${seconds !== 1 ? 's' : ''}`
  return str
}

/**
 * Get a user from a Message's mentions
 * @param {Message} message - Discord message
 * @param {string} idQuery - ID query
 * @returns {Promise<User>}
 */
export async function getUserFromMessage (
  message: Message, idQuery: string
): Promise<User> {
  const { author, guild, mentions } = message

  const userMention = mentions.users.first()
  if (userMention) {
    return userMention
  }

  if (guild) {
    const id = idQuery.match(/\d+/)?.[0]
    if (id) {
      const member = await guild.members.fetch(id)
      return member.user
    }
  }

  return author
}

/**
 * Get a member from a Message's mentions
 * @param {Message} message - Discord message
 * @param {string} idQuery - ID query
 * @returns {Promise<GuildMember | null>}
 */
export async function getMemberFromMessage (
  message: Message, idQuery: string
): Promise<GuildMember | null> {
  const { member, guild, mentions } = message

  const memberMention = mentions.members?.first()
  if (memberMention) {
    return memberMention
  }

  if (guild) {
    const id = idQuery.match(/\d+/)?.[0]
    if (id) {
      return await guild.members.fetch(id)
    }
  }

  return member
}
