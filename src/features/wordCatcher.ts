import { Message } from 'discord.js'
import emoji from '../emoji.json'

type WordCatcher = (message: Message, text: string) => void

const normalWords: Array<[RegExp, string]> = [
  [/\b(?:idk|i\s+don'?t\s+know)\b/, 'ask `.8ball` it will know'],
  // Note: Please put "not?\s+<keyword>" first before "<keyword>"
  [/not?\s+sad/, 'Yes, be happy! \\:)'],
  [/sad/, "Don't be sad, I'm here for you \\:)"],
  [/not?\s+nice/, 'Not nice \\:('],
  [/nice/, 'Nice'],
  [/shut|stfu/, 'shut'],
  [/\b(?:yo)?u\s+suck?/, 'no u'],
  [/\bn(?:o+|u+)b\b/, emoji.unoreverse],
  [/<@!?738252807525892139>/, 'why ping me'],
  [/phobos/, 'who called me']
]

const catchers: WordCatcher[] = [

  function imDad (message, text) {
    const match = text.match(/\bi\s*['`a]?\s*m(?:\s+|\b)/)
    if (match) {
      message.reply(`Hi **${
        message.content.slice(match.index! + match[0].length) || 'blank'
      }**, I'm dad!`)
    }
  },

  async function brrr (message, text) {
    if (text.includes('brrr')) {
      for (const emoji of ['🏎️', '🇻', '🇷', '🇴', '🅾', '🇲']) {
        await message.react(emoji).catch(() => {})
      }
    }
  },

  function normal (message, text) {
    const match = normalWords.find(kv => kv[0].test(text))
    if (match) {
      message.reply(match[1])
    }
  }

]

// If you wanna be blacklisted just add your user ID here
const blacklist = ['548770927039610921']

export default async function (message: Message) {
  if (blacklist.includes(message.author.id)) return
  const text = message.content.toLowerCase()
  catchers.forEach(func => func(message, text))
}
