const { Client, Collection, Intents } = require('discord.js')

const logger = require('./handlers/logger')
const config = require('./config')

class PhobosClient extends Client {
  constructor (options) {
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
      user: require('./db/index').User
    }
  }
}

const options = {
  intents: new Intents(
    // 0 DIRECT_MESSAGE_TYPING
    // 1 DIRECT_MESSAGE_REACTIONS
    // 1 DIRECT_MESSAGES
    // 0 GUILD_MESSAGE_TYPING
    // 1 GUILD_MESSAGE_REACTIONS
    // 1 GUILD_MESSAGES
    // 0 GUILD_PRESENCES
    // 1 GUILD_VOICE_STATES
    // 0 GUILD_INVITES
    // 0 GUILD_WEBHOOKS
    // 1 GUILD_INTEGRATIONS
    // 1 GUILD_EMOJIS
    // 1 GUILD_BANS
    // 1 GUILD_MEMBERS
    // 1 GUILDS
    0b011011010011111
  ),
  partials: ['CHANNEL', 'MESSAGE', 'REACTION']
}

const client = new PhobosClient(options)

module.exports = client