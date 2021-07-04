// Import modules
import dotenv from 'dotenv'
import { readdirSync } from 'fs'
import path from 'path'

// Configure environment variables
dotenv.config()

// eslint-disable-next-line import/first
import client from './client'

// Require handlers
const imports = readdirSync(path.join(__dirname, './handlers'))
  .map(handler => import(`./handlers/${handler}`))

Promise.all(imports)
  .then(() => client.log.debug('All handlers are loaded'))
