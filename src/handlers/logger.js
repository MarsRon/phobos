const { inspect } = require('util')

const log = (level, message) =>
  console.log(
    `${new Date().toISOString()} [${level}] ${
      typeof message === 'string' ? message : inspect(message, { colors: true })
    }`
  )

const logger = {
  debug: message => {
    if (process.env.DEBUG) log('DEBUG', message)
  },
  info: message => log('INFO', message),
  warn: message => log('WARN', message),
  error: message => log('ERROR', message)
}

module.exports = logger
