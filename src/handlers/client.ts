import { Client, ClientOptions, Collection, Intents } from 'discord.js'
import { Logger } from 'winston'
import Command from './command'
import { DBManager, User } from '../db'

import logger from './logger'

require('./InlineReply.js')

interface Idb {
  user: DBManager
}

export class PhobosClient extends Client {
  commands: Collection<string, Collection<string, Command>>
  cooldowns: Collection<string, Collection<string, number>>
  aliases: Collection<string, Command>
  getCmd: Function
  // distube: Distube
  log: Logger
  db: Idb
  constructor (options: ClientOptions) {
    super(options)
    this.commands = new Collection()
    this.cooldowns = new Collection()
    this.aliases = new Collection()
    this.getCmd = function getCmd (name: string) {
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

export default new PhobosClient(options)
