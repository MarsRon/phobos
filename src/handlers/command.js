// Modules
const { Collection } = require('discord.js')
const { readdir } = require('fs')
const path = require('path')

const logger = require('./logger')

// Get all categories
readdir(path.join(__dirname, '../commands'), (err, commandsFolder) => {
  if (err) {
    return logger.error(err)
  }
  const {
    commands: commandsCollection,
    cooldowns,
    aliases
  } = require('../client')
  for (const category of commandsFolder) {
    const categoryCollection = new Collection()
    commandsCollection.set(category, categoryCollection)

    // Get all commands in this category
    const categoryPath = path.join(__dirname, '../commands/', category)
    readdir(categoryPath, (err, categoryFolder) => {
      if (err) {
        return logger.error(err)
      }

      const commands = categoryFolder
        .filter(file => /\.js$/.test(file))
        .map(file => require(`../commands/${category}/${file}`))

      for (const command of commands) {
        const { name, alias } = command

        categoryCollection.set(name, command)
        cooldowns.set(name, new Collection())
        if (alias) {
          alias.forEach(a => aliases.set(a, command))
        }
      }

      logger.debug(
        `Loaded ${commands.length} commands from category '${category}'`
      )
    })
  }
})
