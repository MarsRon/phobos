const { Collection } = require('discord.js')
const { readdirSync } = require('fs')
const path = require('path')

const logger = require('./logger')

// Get collections from client
const {
  commands: commandsCollection,
  cooldowns,
  aliases
} = require('../client')

// Get all categories
const commandsFolder = readdirSync(path.join(__dirname, '../commands'))

for (const category of commandsFolder) {
  // Set category in collection
  const categoryCollection = new Collection()
  commandsCollection.set(category, categoryCollection)

  // Get all commands in this category
  const categoryPath = path.join(__dirname, '../commands/', category)
  const categoryFolder = readdirSync(categoryPath)

  // Read from command files
  const commands = categoryFolder
    .filter(file => /\.js$/.test(file))
    .map(file => require(`../commands/${category}/${file}`))

  // Set up each command, alias and cooldown
  for (const command of commands) {
    const { name, alias } = command

    // Command
    categoryCollection.set(name, command)
    
    // Alias
    if (alias) {
      alias.forEach(a => aliases.set(a, command))
    }
    
    // Cooldown
    cooldowns.set(name, new Collection())
  }

  logger.debug(`Loaded ${commands.length} commands from category '${category}'`)
}
