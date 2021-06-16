import { createLogger, format, transports } from 'winston'
import { redBright, keyword, greenBright, yellowBright, cyanBright } from 'chalk'
import { inspect } from 'util'

const logColors = {
  error: redBright.bold,
  info: greenBright,
  debug: yellowBright,
  warn: keyword('orange')
}

const logMsg = (message: any) => typeof message === 'string' ? message : inspect(message)

const logger = createLogger({
  level: 'info',
  format: format.errors({ stack: true }),
  transports: [
    new transports.Console({
      format: format.printf(log =>
        `${cyanBright(new Date().toISOString().substr(11, 8))} ${
          logColors[log.level as keyof typeof logColors](`[${log.level.toUpperCase()}]`)
        } - ${logMsg(log.stack ?? log.message)}`
      )
    }),
    new transports.File({
      filename: 'phobos.log',
      format: format.printf(log =>
        `${new Date().toISOString()} [${log.level.toUpperCase()}] - ${logMsg(log.stack ?? log.message)}`
      )
    })
  ],
  exitOnError: false
})

process.on('uncaughtException', error => logger.error(error))

export default logger
