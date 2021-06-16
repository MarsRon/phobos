/* eslint-disable no-unused-vars */
/* eslint-disable no-eval */

import { Message } from 'discord.js'
import { inspect } from 'util'

const ownerID = process.env.OWNER_ID

const clean = (text: any) =>
  typeof (text) === 'string' ? text.replace(/`/g, '`\u200b') : text

module.exports = {
  name: 'eval',
  description: 'Run JavaScript code.',
  args: true,
  usage: '<js_code>',
  async execute (message: Message, args: string[]) {
    const { channel, client, guild, member, author: user } = message

    if (user.id !== ownerID) return
    if (!args.length) return

    const OUT = (text: any) =>
      channel.send(clean(text), { code: 'js', split: true })

    try {
      let evaled = eval(args.join(' '))
      if (typeof (evaled) !== 'string') {
        evaled = inspect(evaled)
      }
      message.reply(clean(evaled), { code: 'js', split: true })
    } catch (err: any) {
      message.reply(clean(err.message), { code: 'js', split: true })
    }
  }
}
