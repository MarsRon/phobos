const { inspect } = require('util')
const config = require('../../config')

const {
  embed: { avatar, color, url },
  ownerId
} = config

module.exports = {
  name: 'eval',
  description: 'Run JavaScript code.',
  args: true,
  usage: '<js_code>',
  async execute (message) {
    // Owner check
    const { author, content, prefix } = message
    if (author.id !== ownerId) return

    // Directly get code from message content
    let code = content.slice(prefix.length + this.name.length).trim()

    if (!code) return

    // Filter out codeblock
    if (code.startsWith('```')) {
      code = code.replace(/^```(?:js)?([\S\s]+)```$/is, '$1')
    }

    // Get class of object
    const handleResultClass = result =>
      result !== undefined && result !== null
        ? result.__proto__ !== undefined
          ? result.constructor.name
          : 'no prototype'
        : 'void'

    // Display objects with inspect but not strings
    const handleResult = result => {
      const className = handleResultClass(result)
      // Parse errors
      if (className.includes('Error')) {
        result = `${className}: ${result.message}` ?? result
      }
      // Don't parse strings
      if (typeof result !== 'string') {
        result = inspect(result, true, 0)
      }
      // Limit to 4096 characters
      if (result.length > 4096 - 9) {
        result = result.slice(0, 4096 - 12) + '...'
      }
      return '```js\n' + result + '```'
    }

    // Send data as discord message
    const send = result =>
      message.reply({
        embeds: [
          {
            description: handleResult(result),
            fields: [
              ['Class', `\`${handleResultClass(result)}\``],
              ['Type', `\`${typeof result}\``]
            ].map(([name, value]) => ({ name, value, inline: true })),
            color,
            author: { name: 'Eval Result', url, icon_url: avatar }
          }
        ]
      })

    // Run eval with variables
    const runEval = async code => {
      try {
        // Inject variables
        let { channel, client, content, guild, member, author: user } = message
        let { db, config, distube } = client
        // Automatically detect async code
        if (code.includes('await')) {
          return eval(`async () => {
            try {${code}}
            catch (error) {
              return error
            }
          }`)()
        }
        return eval(code)
      } catch (error) {
        return error
      }
    }

    send(await runEval(code))
  }
}
