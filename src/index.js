// This is the main file where the bot starts from

const dotenv = require('dotenv')
const { readdirSync } = require('fs')
const path = require('path')

// Configure environment variables
dotenv.config()

// Implement "Fixes for 403 errors (by fixing clients)" patch
// https://github.com/distubejs/ytdl-core/pull/163
const fs = require('fs')
const { Readable } = require('stream')
const { finished } = require('stream/promises')
const patchBaseUrl = 'https://raw.githubusercontent.com/ToddyTheNoobDud/ytdl-core-stuff/37acb1c7ca203bb33c1219bffe5fb2b820b52f69/'
const buggedInfo = './node_modules/@distube/ytdl-core/lib/info.js'
const buggegUtils = './node_modules/@distube/ytdl-core/lib/utils.js'
const patchedInfo = patchBaseUrl + 'lib/info.js'
const patchedUtils = patchBaseUrl + 'lib/utils.js'
const patch = async (buggedFile, patchUrl) => {
  const stream = fs.createWriteStream(buggedFile)
  const { body } = await fetch(patchUrl)
  return finished(Readable.fromWeb(body).pipe(stream))
}

// Wait for internet connection
import('is-online').then(({ default: isOnline }) =>
  isOnline({ timeout: 60 * 1000 })
).then(async () => {
  await Promise.all([patch(buggedInfo, patchedInfo), patch(buggegUtils, patchedUtils)])
  .then(() => console.log(`Implement "Fixes for 403 errors (by fixing clients)" patch from ytdl-core (see src/index.js:10)`))

  const client = require('./client')

  // Require handlers
  const handlers = readdirSync(path.join(__dirname, './handlers'))
  handlers.forEach(handler => require(`./handlers/${handler}`))

  client.log.info('All handlers are loaded')

  client.login(process.env.DISCORD_TOKEN)
})
