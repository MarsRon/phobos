const client = require('../client')
const { readdir } = require('fs')
const path = require('path')

readdir(path.join(__dirname, '../events'), (err, files) => {
  if (err) {
    console.log(`[handler/event] ${err}`)
  }
  files
    .filter(file => file.endsWith('.js'))
    .map(name => name.slice(0, -3))
    .forEach(name => {
      const eventHandler = require(`../events/${name}`)
      if (eventHandler.once) {
        client.once(name, eventHandler)
      } else {
        client.on(name, eventHandler)
      }
      client.log.debug(`Loaded event '${name}'`)
    })
})

client.log.info('event handler loaded')
