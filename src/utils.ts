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
