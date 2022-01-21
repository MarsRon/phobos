const client = require('../client')
const { readdirSync } = require('fs')
const path = require('path')

const files = readdirSync(path.join(__dirname, '../events'))

files
  // Filter js files
  .filter(file => file.endsWith('.js'))
  // Remove extension
  .map(name => name.slice(0, -3))
  .forEach(name => {
    const eventHandler = require(`../events/${name}`)
    client.on(name, eventHandler)
    client.log.debug(`Loaded event ${name}`)
  })
