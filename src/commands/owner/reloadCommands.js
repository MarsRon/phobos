const { readdir } = require('fs/promises')
const path = require('path')
const config = require('../../config')

const { ownerId } = config

module.exports = {
  name: 'reload-commands',
  description: 'Reload all bot commands.',
  async execute (message) {
    if (message.author.id !== ownerId) return
    const response = []

    // Get all categories
    const commandsFolder = await readdir(path.join(__dirname, '../../commands'))
    const { commands: commandsCollection, aliases } = message.client
    for (const category of commandsFolder) {
      const categoryCollection = commandsCollection.get(category)

      // Get all commands in this category
      const categoryFolder = await readdir(
        path.join(__dirname, '../../commands/', category)
      )

      const commands = categoryFolder
        .filter(file => /\.js$/.test(file))
        .map(file => {
          const filepath = `../../commands/${category}/${file}`
          // Delete require cache
          delete require.cache[require.resolve(filepath)]
          return require(filepath)
        })

      for (const command of commands) {
        const { name, alias } = command

        categoryCollection.set(name, command)
        if (alias) {
          alias.forEach(a => aliases.set(a, command))
        }
      }

      response.push(
        `Loaded ${commands.length} commands from category '${category}'`
      )
    }

    message.reply(response.join('\n'))
  }
}
