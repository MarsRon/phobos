import client from './client'
import { readdir } from 'fs'
import path from 'path'

type EventHandler = {
  default: (...args: any[]) => void
}

readdir(path.join(__dirname, '../events'), (err, files) => {
  if (err) {
    console.log(`[handler/event] ${err}`)
  }
  files.filter(file => /\.[jt]s$/.test(file))
    .map(name => name.slice(0, -3))
    .forEach(async name => {
      const eventHandler: EventHandler = await import(`../events/${name}`)
      client.on(name, eventHandler.default)
    })
})
