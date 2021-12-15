const { evaluate } = require('mathjs')
const config = require('../../config')

const { color } = config.embed

module.exports = {
  name: 'math',
  alias: ['calc'],
  description: 'A Discord ~~meth~~math calculator.',
  args: true,
  usage: '<math expression>',
  execute (message, args) {
    try {
      const question = args.join(' ')
      const answer = evaluate(question)
      const embed = {
        title: 'Calculator',
        color,
        fields: [
          { name: 'Question', value: '```css\n' + question + '```' },
          { name: 'Answer', value: '```css\n' + answer + '```' }
        ]
      }
      message.reply({ embeds: [embed] })
    } catch (error) {
      message.client.log.error(error)
      message.reply(":x: Sorry, I don't understand you math expression")
    }
  }
}
