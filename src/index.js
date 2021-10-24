// Import modules
const dotenv = require('dotenv')
const { readdirSync } = require('fs')
const path = require('path')

// Configure environment variables
dotenv.config()

const client = require('./client')

// Require handlers
readdirSync(path.join(__dirname, './handlers')).map(handler =>
  require(`./handlers/${handler}`)
)

client.login(process.env.DISCORD_TOKEN)

client.log.info('All handlers are loaded')
