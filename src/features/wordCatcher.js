const client = require('../client')
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
  function normal (text, message) {
    const match = normalWords.find(kv => kv[0].test(text))
    if (match) {
      return match[1]
    }
  },
  function imDad (text, message) {
    const match = text.match(/\bi\s*['`a]?\s*m(?:\s+|\b)/)
    if (match) {
      return `Hi **${
        match[0].length
          ? message.content.slice(match.index + match[0].length)
          : 'blank'
      }**, I'm dad!`
    }
  }
]

// If you wanna be blacklisted just add your user ID here
const blacklist = ['548770927039610921']

module.exports = async message => {
  const { author, content, guild } = message
  if (blacklist.includes(author.id)) return
  const text = content.toLowerCase()
  let response
  catchers.some(func => (response = func(text, message)) !== undefined)
  if (response) {
    message.reply(response)
    client.log.info(
      `Word catcher: ${JSON.stringify({
        user: author.tag,
        id: author.id,
        guild: guild?.name,
        guildId: guild?.id,
        content,
        response
      })}`
    )
  }
}
