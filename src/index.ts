// Import modules
import dotenv from 'dotenv'
import { readdirSync } from 'fs'
import path from 'path'

import client from './handlers/client'

// Configure environment variables
dotenv.config()

// Require handlers
readdirSync(path.join(__dirname, './handlers'))
  .forEach(handler => import(`./handlers/${handler}`))

// Login bot
client.login(process.env.DISCORD_TOKEN)
