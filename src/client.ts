import { Client, ClientOptions, Collection, Intents } from 'discord.js'
import { Logger } from 'winston'
import Command from './handlers/command'
import { DBManager, User } from './db'
import DisTube from 'distube'

import logger from './handlers/logger'
import config, { PhobosConfig } from './config'

require('./handlers/InlineReply.js')

interface Idb {
  user: DBManager
}

export class PhobosClient extends Client {
  config: PhobosConfig
  commands: Collection<string, Collection<string, Command>>
  aliases: Collection<string, Command>
  cooldowns: Collection<string, Collection<string, number>>
  getCmd: (name: string) => Command | undefined
  log: Logger
  db: Idb
  distube?: DisTube
  constructor (options: ClientOptions) {
    super(options)
    this.config = config
    this.commands = new Collection()
    this.aliases = new Collection()
    this.cooldowns = new Collection()
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
  ws: {
    intents: new Intents(
      // Read from left to right
      // [X] meaning removed intent

      // [X] DIRECT_MESSAGE_TYPING
      // DIRECT_MESSAGE_REACTIONS
      // DIRECT_MESSAGES
      // [X] GUILD_MESSAGE_TYPING
      // GUILD_MESSAGE_REACTIONS
      // GUILD_MESSAGES
      // [X] GUILD_PRESENCES
      // GUILD_VOICE_STATES
      // [X] GUILD_INVITES
      // [X] GUILD_WEBHOOKS
      // [X] GUILD_INTEGRATIONS
      // GUILD_EMOJIS
      // GUILD_BANS
      // GUILD_MEMBERS
      // GUILDS
      Intents.ALL - 0b100100101110000
    )
  },
  partials: ['CHANNEL', 'MESSAGE', 'REACTION']
}

const client = new PhobosClient(options)

client.login(process.env.DISCORD_TOKEN)

export default client
