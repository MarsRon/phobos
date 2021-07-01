/* eslint-disable no-unused-vars */
/* eslint-disable no-eval */

import { Message } from 'discord.js'
import { inspect } from 'util'
import config from '../../config'
import { PhobosClient } from '../../handlers/client'

const { embed: { avatar, color, url }, ownerID, prefix } = config

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
      color,
      author: { name: 'Eval Result', url, icon_url: avatar }
    }
  })

  try {
    // Inject variables
    const { channel, client, content, guild, member, author: user } = message
    const { db } = client as PhobosClient

    if (code.includes('await')) {
      result = await (
        eval(
          `async () => {${code}}`
        )() as Promise<any>
      )
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
