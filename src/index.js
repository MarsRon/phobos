// This is the main file where the bot starts from

const dotenv = require('dotenv')
const { readdirSync } = require('fs')
const path = require('path')

// Configure environment variables
dotenv.config()

// Fixes "403 error" bug from ytdl-core
// https://github.com/distubejs/ytdl-core/issues/84#issuecomment-2295590460
// https://discord.com/channels/732254550689316914/1271765204253933609/1275273097120841781
// const fs = require('fs/promises')
// const buggedFilePath = './node_modules/@distube/youtube/dist/index.js'
// fs.readFile(buggedFilePath)
//   .then(data =>
//     data.toString().replace(
//       /const info = await import_ytdl_core.default.getInfo\(song.url, this.ytdlOptions\);/g,
//       `let info = await import_ytdl_core.default.getInfo(song.url, this.ytdlOptions);\n    info.formats = info.formats.filter(f => f.hasAudio && f.url.includes("c=IOS")) /* 403 Error Workaround */`
//     )
//   ).then(data => fs.writeFile(buggedFilePath, data))
//   .then(() => console.log(`Fixed "403 error" bug from ytdl-core (see src/index.js:10)`))
//   .catch(err => console.error(err))

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
