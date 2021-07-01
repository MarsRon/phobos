import { createLogger, format, transports } from 'winston'
import { bgRed, blueBright, cyanBright, greenBright, yellow } from 'chalk'
import { TransformableInfo } from 'logform'
import { inspect } from 'util'

const logColors = {
  error: bgRed.bold,
  info: greenBright.bold,
  debug: blueBright.bold,
  warn: yellow.bold
}

// This logs to the command line with colors
const cliLogFormat = format.printf(
  ({ timestamp, level, message, stack }: TransformableInfo) => {
    // Use stack trace if available (Errors only)
    message = stack ?? message
    return `${cyanBright((timestamp as string).substr(11, 8))} ${
      logColors[level as keyof typeof logColors](`[${level.toUpperCase()}]`)
    } ${
      typeof message === 'string' ? message : inspect(message, { colors: true })
    }`
  }
)

// This logs to a file called phobos.log
const fileLogFormat = format.combine(
  format.printf(
    ({ timestamp, level, message, stack }: TransformableInfo) => {
      // Use stack trace if available (Errors only)
      message = stack ?? message
      return `${timestamp} [${level.toUpperCase()}] ${
        typeof message === 'string' ? message : inspect(message)
      }`
    }
  ),
  format.uncolorize()
)

const logger = createLogger({
  level: process.env.DEBUG === 'true' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true })
  ),
  transports: [
    new transports.Console({
      format: cliLogFormat
    }),
    new transports.File({
      filename: 'phobos.log',
      format: fileLogFormat
    }),
    new transports.File({
      filename: 'phobos-errors.log',
      level: 'error',
      format: fileLogFormat
    })
  ],
  exitOnError: false
})

process.on('uncaughtException', error => logger.error(error))

export default logger
