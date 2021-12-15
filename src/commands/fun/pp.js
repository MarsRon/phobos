const { getUserFromMessage } = require('../../utils')
const config = require('../../config')

const { color } = config.embed

module.exports = {
  name: 'pp',
  alias: ['penis', '8=D', 'ppsize'],
  description: 'Haha pp go brrr',
  usage: '[user]',
  async execute (message, args) {
    const user = await getUserFromMessage(message, args[0])
    const ppSize = Math.floor(Math.random() * 25)
    const pp = `8${'='.repeat(ppSize)}D`
    const embed = {
      title: 'PP Size Calculator',
      description: `${user}'s PP is ${ppSize} banana${
        ppSize === 1 ? '  ' : 's'
      } long!\n\`\`\`${pp}\`\`\``,
      color
    }
    message.reply({ embeds: [embed] })
  }
}
