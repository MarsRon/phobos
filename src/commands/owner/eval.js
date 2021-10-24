const { inspect } = require('util')
const config = require('../../config')

const {
  embed: { avatar, color, url },
  ownerID,
  prefix
} = config

async function discordEval (code, message) {
  if (!code) return

  if (code.startsWith('```')) {
    code = code.replace(/^```(?:js)?([\S\s]+)```$/is, '$1')
  }

  const send = result =>
    message.reply({
      embeds: [
        {
          description:
            '```js\n' + inspect(result, true, 0).slice(0, 2048 - 9) + '```',
          fields: [
            [
              'Class',
              `\`${
                result !== undefined && result !== null
                  ? result.constructor.name
                  : 'void'
              }\``
            ],
            ['Type', `\`${typeof result}\``]
          ].map(([name, value]) => ({ name, value, inline: true })),
          color,
          author: { name: 'Eval Result', url, icon_url: avatar }
        }
      ]
    })

  let result
  try {
    // Inject variables
    const { channel, client, content, guild, member, author: user } = message
    const { db, config } = client

    if (code.includes('await')) {
      result = await eval(`async () => {${code}}`)()
    } else {
      result = eval(code)
    }
  } catch (err) {
    result = err.message ?? err
  }
  send(result)
}

module.exports = {
  name: 'eval',
  description: 'Run JavaScript code.',
  args: true,
  usage: '<js_code>',
  async execute (message) {
    const { author, content } = message
    if (author.id !== ownerID) return
    const code = content.slice(prefix.length + 4).trim()
    discordEval(code, message)
  }
}
