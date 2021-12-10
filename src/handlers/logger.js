const { createLogger, format, transports } = require('winston')
const { inspect } = require('util')

const log = createLogger({
  level: process.env.DEBUG === 'true' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.colorize({ level: true }),
    format.errors({ stack: true }),
    format.printf(a => {
      const { level, message, timestamp } = a
      const txt = `${timestamp} [${level.replace(
        /(?<=\x1B\[.+?m).+?(?=\x1B\[.+?m)/,
        m => m.toUpperCase()
      )}]: ${
        typeof message === 'string'
          ? message
          : inspect(message, { colors: true })
      }`
      return txt
    })
  ),
  transports: [new transports.Console()]
})

module.exports = log
