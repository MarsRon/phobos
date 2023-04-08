const Discord = require('discord.js')
const { GuildMember, Message, User } = Discord

class Util {
  /**
   * Format duration milliseconds into DHMS '1d 2h 3m 4s' string
   * @param {number} ms - Duration in milliseconds
   * @returns {string}
   */
  static timeToDHMS (ms) {
    ms /= 1000
    return `${~~(ms / 86400)}d ${~~(ms / 3600) % 24}h ${~~(ms / 60) % 60}m ${
      ~~ms % 60
    }s`
  }

  /**
   * Format duration milliseconds into 'x hour(s) y minute(s) z second(s)' string
   * @param {number} ms - Duration in milliseconds
   * @returns {string}
   */
  static timeToStr (ms) {
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

  /**
   * Get a user from a Message's mentions
   * @param {Message} message - Discord message
   * @param {string} [id] - ID query
   * @returns {Promise<User>}
   */
  static async getUserFromMessage (message, id) {
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
  static async getMemberFromMessage (message, id) {
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
  static formatDate (date) {
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

  /**
   * Get the queue status
   * @param {Queue} queue - DisTube Queue
   * @returns {string} status
   */
  static getQueueStatus (queue) {
    const { volume } = queue
    const filter = queue.filter ?? '❌'
    let loop = '❌'
    if (queue.repeatMode === 2) {
      loop = 'All Queue'
    } else if (queue.repeatMode) {
      loop = 'This Song'
    }
    const autoplay = queue.autoplay ? 'On' : '❌'
    return `Volume: ${volume}% | Filter: ${filter} | Loop: ${loop} | Autoplay: ${autoplay}`
  }

  /**
   * Options for splitting a message.
   * @typedef {Object} SplitOptions
   * @property {number} [maxLength=2000] Maximum character length per message piece
   * @property {string|string[]|RegExp|RegExp[]} [char='\n'] Character(s) or Regex(es) to split the message with,
   * an array can be used to split multiple times
   * @property {string} [prepend=''] Text to prepend to every piece except the first
   * @property {string} [append=''] Text to append to every piece except the last
   */

  /**
   * Splits a string into multiple chunks at a designated character that do not exceed a specific length.
   * @param {string} text Content to split
   * @param {SplitOptions} [options] Options controlling the behavior of the split
   * @returns {string[]}
   */
  static splitMessage (
    text,
    { maxLength = 2000, char = '\n', prepend = '', append = '' } = {}
  ) {
    text = Discord.verifyString(text)
    if (text.length <= maxLength) return [text]
    let splitText = [text]
    if (Array.isArray(char)) {
      while (
        char.length > 0 &&
        splitText.some(elem => elem.length > maxLength)
      ) {
        const currentChar = char.shift()
        if (currentChar instanceof RegExp) {
          splitText = splitText.flatMap(chunk => chunk.match(currentChar))
        } else {
          splitText = splitText.flatMap(chunk => chunk.split(currentChar))
        }
      }
    } else {
      splitText = text.split(char)
    }
    if (splitText.some(elem => elem.length > maxLength))
      throw new RangeError('SPLIT_MAX_LEN')
    const messages = []
    let msg = ''
    for (const chunk of splitText) {
      if (msg && (msg + char + chunk + append).length > maxLength) {
        messages.push(msg + append)
        msg = prepend
      }
      msg += (msg && msg !== prepend ? char : '') + chunk
    }
    return messages.concat(msg).filter(m => m)
  }
}

module.exports = Util