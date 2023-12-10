// This is the main file where the bot starts from

const dotenv = require('dotenv')
const { readdirSync } = require('fs')
const path = require('path')

// Configure environment variables
dotenv.config()

// Wait for internet connection
import('is-online').then(({ default: isOnline }) =>
  isOnline({ timeout: 60 * 1000 })
).then(() => {

  const client = require('./client')

  // Require handlers
  const handlers = readdirSync(path.join(__dirname, './handlers'))
  handlers.forEach(handler => require(`./handlers/${handler}`))

  client.log.info('All handlers are loaded')

  client.login(process.env.DISCORD_TOKEN)
})
