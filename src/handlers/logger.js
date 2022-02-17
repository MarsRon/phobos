const { createLogger, format, transports } = require('winston')
const { inspect } = require('util')

const log = createLogger({
  level: process.env.DEBUG === 'true' ? 'debug' : 'info',
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => {
      const level = info.level.toUpperCase()
      const message =
        info.stack ??
        (typeof info.message === 'string'
          ? info.message
          : inspect(info.message))
      return `${info.timestamp} [${level.toUpperCase()}] ${message}`
    })
  ),
  transports: [new transports.Console()]
})

module.exports = log
