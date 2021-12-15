const { createLogger, format, transports } = require('winston')
const { inspect } = require('util')

const log = createLogger({
  level: process.env.DEBUG === 'true' ? 'debug' : 'info',
  format: format.combine(
    format.colorize({ level: true }),
    format.errors({ stack: true }),
    format.printf(
      ({ level, message, stack }) =>
        `[${level.replace(/(?<=^\x1B\[.+?m).+?(?=\x1B\[.+?m$)/, m =>
          m.toUpperCase()
        )}] ${stack ??
          (typeof message === 'string'
            ? message
            : inspect(message, { colors: true }))}`
    )
  ),
  transports: [new transports.Console()]
})

module.exports = log
