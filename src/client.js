const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
  Options
} = require('discord.js')

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
  intents: [
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.Guilds
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.Channel,
    Partials.User,
    Partials.Reaction
  ],
  makeCache: Options.cacheWithLimits({
    MessageManager: 100
  })
}

const client = new PhobosClient(options)

module.exports = client
