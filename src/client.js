const { Client, Collection, Intents, Options } = require('discord.js')

// Required handlers
const log = require('./handlers/logger')
const config = require('./config')
const db = require('./db')

/**
 * Custom PhobosClient with extra features
 * @class
 * @constructor
 * @extends Client
 */
class PhobosClient extends Client {
  /**
   * Create a PhobosClient
   * @param {object} options Discord.js Client options
   */
  constructor (options) {
    super(options)

    /**
     * Configs defined in src/config.js
     * @type {object}
     */
    this.config = config

    /**
     * Contains categories that contain the actual commands
     * @type {Collection}
     */
    this.commands = new Collection()

    /**
     * All aliases to commands (kinda like a index)
     * @type {Collection}
     */
    this.aliases = new Collection()

    /**
     * Command cooldowns
     * @type {Collection}
     */
    this.cooldowns = new Collection()

    /**
     * Custom logger
     * @type {object}
     */
    this.log = log

    /**
     * Databases
     * @type {object}
     */
    this.db = {
      user: db.User,
      guild: db.Guild
    }
  }

  /**
   * Get a command from name or alias
   * @param {string} name Command name or alias
   * @returns {object} Command
   */
  getCmd (name) {
    // Loop through all categories and find commands in them
    for (const category of this.commands.values()) {
      const cmd = category.get(name)
      if (cmd) {
        return cmd
      }
    }
    // If not found, find in aliases
    return this.aliases.get(name)
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
  partials: ['CHANNEL', 'MESSAGE', 'REACTION'],
  makeCache: Options.cacheWithLimits({
    MessageManager: 100
  })
}

const client = new PhobosClient(options)

module.exports = client
