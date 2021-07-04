import { Client, ClientOptions, Collection, Intents } from 'discord.js'
import { Logger } from 'winston'
import Command from './handlers/command'
import { DBManager, User } from './db'
import DisTube from 'distube'

import logger from './handlers/logger'

require('./handlers/InlineReply.js')

interface Idb {
  user: DBManager
}

export class PhobosClient extends Client {
  commands: Collection<string, Collection<string, Command>>
  cooldowns: Collection<string, Collection<string, number>>
  aliases: Collection<string, Command>
  getCmd: (name: string) => Command | undefined
  log: Logger
  db: Idb
  distube?: DisTube
  constructor (options: ClientOptions) {
    super(options)
    this.commands = new Collection()
    this.cooldowns = new Collection()
    this.aliases = new Collection()
    this.getCmd = function getCmd (name) {
      for (const category of this.commands.values()) {
        const cmd = category.get(name)
        if (cmd) {
          return cmd
        }
      }
      return this.aliases.get(name)
    }
    this.log = logger
    this.db = {
      user: User
    }
  }
}

const options: ClientOptions = {
  ws: { intents: new Intents(Intents.ALL) },
  partials: ['CHANNEL', 'MESSAGE', 'REACTION']
}

const client = new PhobosClient(options)

client.login(process.env.DISCORD_TOKEN)

export default client
