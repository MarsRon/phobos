const emojiLookup = {
  '0': ':zero:',
  '1': ':one:',
  '2': ':two:',
  '3': ':three:',
  '4': ':four:',
  '5': ':five:',
  '6': ':six:',
  '7': ':seven:',
  '8': ':eight:',
  '9': ':nine:'
}

module.exports = {
  name: 'emojify',
  description: 'emojify'
    .split('')
    .map(c => `:regional_indicator_${c}:`)
    .join(''),
  args: true,
  usage: '<text>',
  async execute (message, args) {
    const text = args.join(' ')
    const emojified = text
      .split('')
      .map(c => {
        if (emojiLookup[c]) return emojiLookup[c]
        if (/[a-zA-Z]/.test(c)) return `:regional_indicator_${c.toLowerCase()}:`
        return c
      })
      .join('')
    const trunc = emojified.slice(0, 2000).replace(/:[^:]+?$/, '')
    message.reply(trunc)
  }
}
