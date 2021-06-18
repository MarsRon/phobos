/* eslint-disable no-eval */
import { Message } from 'discord.js'
import { inspect } from 'util'

const { OWNER_ID: ownerID, PREFIX: prefix } = process.env

async function discordEval (code: string, message: Message) {
  if (!code) return

  if (code.startsWith('```')) {
    code = code.replace(/^```(?:js)?([\S\s]+)```$/is, '$1').trim()
  }

  let result: any

  const send = () => message.reply({
    embed: {
      description: '```js\n' + inspect(result, true, 0).slice(0, 2048 - 9) + '```',
      fields: [
        ['Class', `\`${result !== undefined && result !== null ? result.constructor.name : 'void'}\``],
        ['Type', `\`${typeof result}\``]
      ].map(([name, value]) => ({ name, value, inline: true })),
      color: 0x4336F3,
      author: {
        name: 'Eval Result',
        url: 'https://phobos.marsron.repl.co',
        icon_url: 'https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp?size=32'
      }
    }
  })

  try {
    // Inject variables
    // eslint-disable-next-line no-unused-vars
    const { channel, client, content, guild, member, author: user } = message

    if (code.includes('await')) {
      result = await (eval(`async () => {${code}}`)() as Promise<any>)
    } else {
      result = eval(code)
    }
  } catch (err: any) {
    result = err.message ?? err
  }

  send()
}

export default {
  name: 'eval',
  description: 'Run JavaScript code.',
  args: true,
  usage: '<js_code>',
  async execute (message: Message) {
    const { author, content } = message
    if (author.id !== ownerID) return
    const code = content.slice(prefix!.length + 4).trim()
    discordEval(code, message)
  }
}
