// Modules
import { Collection, Message } from 'discord.js'
import { readdir } from 'fs'
import path from 'path'
import client from './client'

// Types
type Command = {
  name: string
  alias: string[]
  description: string
  args: boolean
  usage: string
  guildOnly: boolean
  permission: string
  cooldown: number
  execute: (message: Message, args: string[]) => any
}
export default Command

// Commands and cooldowns
const { commands, cooldowns, aliases } = client

readdir(path.join(__dirname, '../commands'), (err, commandsFolder) => {
  if (err) {
    return client.log.error(err)
  }
  for (const category of commandsFolder) {
    if (category === 'cmd.js.example') {
      continue
    }
    const categoryCollection = new Collection<string, Command>()
    commands.set(category, categoryCollection)

    readdir(path.join(__dirname, '../commands/', category), (err, categoryFolder) => {
      if (err) {
        return client.log.error(err)
      }
      const promises: Promise<any>[] = categoryFolder
        .filter(file => /\.[jt]s$/.test(file))
        .map(file => import(`../commands/${category}/${file}`))

      Promise.all(promises).then(cmds => cmds.forEach(file => {
        const command: Command = file.default
        const { name, alias } = command
        categoryCollection.set(name, command)
        cooldowns.set(name, new Collection())
        if (alias) {
          alias.forEach(a => aliases.set(a, command))
        }
        client.log.info(command)
      }))
    })
  }
})
