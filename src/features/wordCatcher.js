const emoji = require('../emoji.json')

const normalWords = [
  // Note: Please put "not?\s+<keyword>" first before "<keyword>"
  [/idk|i\s+don'?t\s+know/, 'ask `.8ball` it will know'],
  [/not?\s+sad/, 'Yes, be happy! \\:)'],
  [/sad/, "Don't be sad, I'm here for you \\:)"],
  [/not?\s+nice/, 'Not nice \\:('],
  [/nice/, 'Nice'],
  [/shut|stfu/, 'shut'],
  [/fu(?:c|k|ck)\s+(:yo)?u/, 'No u'],
  [/\b(?:yo)?u\s+suck?/, 'no u'],
  [/\bn(?:o+|u+)b\b/, emoji.unoreverse],
  [/<@!?738252807525892139>/, 'why ping me'],
  [/phobos/, 'who called me']
]

const catchers = [
  function normal (message, text) {
    const match = normalWords.find(kv => kv[0].test(text))
    if (match) {
      message.reply(match[1])
      return true
    }
  },
  function imDad (message, text) {
    const match = text.match(/\bi\s*['`a]?\s*m(?:\s+|\b)/)
    if (match) {
      message.reply(
        `Hi **${
          match[0].length
            ? message.content.slice(match.index + match[0].length)
            : 'blank'
        }**, I'm dad!`
      )
      return true
    }
  }
]

// If you wanna be blacklisted just add your user ID here
const blacklist = ['548770927039610921']

module.exports = async message => {
  if (blacklist.includes(message.author.id)) return
  const text = message.content.toLowerCase()
  catchers.some(func => func(message, text) === true)
}
