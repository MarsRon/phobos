// Modules
import { Collection, Message, PermissionResolvable } from 'discord.js'
import { readdir } from 'fs'
import path from 'path'

import client from '../client'

// Types
type Command = {
  name: string
  alias: string[]
  description: string
  args: boolean
  usage: string
  guildOnly: boolean
  permission: PermissionResolvable
  cooldown: number
  execute: (message: Message, args?: string[]) => any
}
export default Command

const { commands: commandsCollection, cooldowns, aliases } = client

// Get all categories
readdir(path.join(__dirname, '../commands'), (err, commandsFolder) => {
  if (err) {
    return client.log.error(err)
  }
  for (const category of commandsFolder) {
    const categoryCollection = new Collection<string, Command>()
    commandsCollection.set(category, categoryCollection)

    // Get all commands in this category
    const categoryPath = path.join(__dirname, '../commands/', category)
    readdir(categoryPath, (err, categoryFolder) => {
      if (err) {
        return client.log.error(err)
      }

      const promises: Promise<any>[] = categoryFolder
        .filter(file => /\.[jt]s$/.test(file))
        .map(file => import(`../commands/${category}/${file}`))

      Promise.all(promises).then(commands => {
        for (const file of commands) {
          const command: Command = file.default
          const { name, alias } = command

          categoryCollection.set(name, command)
          cooldowns.set(name, new Collection())
          if (alias) {
            alias.forEach(a => aliases.set(a, command))
          }
        }

        client.log.debug(`Loaded ${commands.length} commands from category '${category}'`)
      })
    })
  }
})
