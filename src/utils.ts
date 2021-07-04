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

const formatInt = (int: number) => int < 10 ? `0${int}` : `${int}`

export function formatDuration (milliseconds: any): string {
  if (!milliseconds || isNaN(milliseconds)) {
    return '00:00'
  }
  const ms = parseInt(milliseconds) / 1000
  const seconds = Math.floor(ms % 60)
  const minutes = Math.floor(ms % 3600 / 60)
  const hours = Math.floor(ms / 3600)
  if (hours > 0) {
    return `${formatInt(hours)}:${formatInt(minutes)}:${formatInt(seconds)}`
  }
  return `${formatInt(minutes)}:${formatInt(seconds)}`
};

/**
 * Get a user from a Message's mentions
 * @param {Message} message - Discord message
 * @param {string} id - ID query
 * @returns {Promise<User>}
 */
export async function getUserFromMessage (
  message: Message, id: string
): Promise<User> {
  const { author, guild, mentions } = message

  const userMention = mentions.users.first()
  if (userMention) {
    return userMention
  }

  if (guild && id) {
    const _id = id.match(/\d+/)?.[0]
    if (_id) {
      const member = await guild.members.fetch(_id)
      return member.user
    }
  }

  return author
}

/**
 * Get a member from a Message's mentions
 * @param {Message} message - Discord message
 * @param {string} id - ID query
 * @returns {Promise<GuildMember | null>}
 */
export async function getMemberFromMessage (
  message: Message, id: string
): Promise<GuildMember | null> {
  const { member, guild, mentions } = message

  const memberMention = mentions.members?.first()
  if (memberMention) {
    return memberMention
  }

  if (guild && id) {
    const _id = id.match(/\d+/)?.[0]
    if (_id) {
      return await guild.members.fetch(_id)
    }
  }

  return member
}

/**
 * Formats date into a presentable form
 * @param {Date} date
 * @returns {string}
 */
export function formatDate (date: Date | number): string {
  if (!date) return ''
  if (typeof date === 'number') {
    date = new Date(date)
  }
  const str = date.toLocaleString('en-GB', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
  return str.slice(0, -2) + str.slice(-2).toUpperCase()
}
