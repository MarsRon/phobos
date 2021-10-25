const { GuildMember, Message, User } = require('discord.js')

/**
 * Format duration milliseconds into DHMS '1d 2h 3m 4s' string
 * @param {number} ms - Duration in milliseconds
 * @returns {string}
 */
function timeToDHMS (ms) {
  ms /= 1000
  return `${~~(ms / 86400)}d ${~~(ms / 3600) % 24}h ${~~(
    ms / 60
  ) % 60}m ${~~ms % 60}s`
}

/**
 * Format duration milliseconds into 'x hour(s) y minute(s) z second(s)' string
 * @param {number} ms - Duration in milliseconds
 * @returns {string}
 */
function timeToStr (ms) {
  ms /= 1000
  let str = ''
  if (ms >= 60) {
    if (ms >= 3600) {
      const hour = ~~(ms / 3600)
      str += `${hour} hour${hour !== 1 ? 's' : ''} `
      ms %= 3600
    }
    const minute = ~~(ms / 60)
    str += `${minute} minute${minute !== 1 ? 's' : ''} `
    ms %= 60
  }
  str += `${ms.toFixed(0)} second${ms !== 1 ? 's' : ''}`
  return str
}

const formatInt = int => (int < 10 ? `0${int}` : `${int}`)

function formatDuration (milliseconds) {
  if (!milliseconds || isNaN(milliseconds)) {
    return '00:00'
  }
  const ms = parseInt(milliseconds) / 1000
  const seconds = Math.floor(ms % 60)
  const minutes = Math.floor((ms % 3600) / 60)
  const hours = Math.floor(ms / 3600)
  if (hours > 0) {
    return `${formatInt(hours)}:${formatInt(minutes)}:${formatInt(seconds)}`
  }
  return `${formatInt(minutes)}:${formatInt(seconds)}`
}

/**
 * Get a user from a Message's mentions
 * @param {Message} message - Discord message
 * @param {string} [id] - ID query
 * @returns {Promise<User>}
 */
async function getUserFromMessage (message, id) {
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
 * @param {string} [id] - ID query
 * @returns {Promise<GuildMember | null>}
 */
async function getMemberFromMessage (message, id) {
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
function formatDate (date) {
  if (!date) return ''
  if (typeof date === 'number') {
    date = new Date(date)
  }
  return date.toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
}

module.exports = {
  timeToDHMS,
  timeToStr,
  formatDuration,
  getUserFromMessage,
  getMemberFromMessage,
  formatDate
}
