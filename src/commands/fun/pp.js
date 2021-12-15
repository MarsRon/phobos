const config = require('../../config')

const { color } = config.embed

module.exports = {
  name: 'pp',
  alias: ['penis', '8=D', 'ppsize'],
  description: 'Haha pp go brrr',
  async execute (message) {
    const ppSize = Math.floor(Math.random() * 26)
    const pp = `8${'='.repeat(ppSize)}D`
    const embed = {
      title: 'PP Size Calculator',
      description: `Your PP is ${ppSize} banana${
        ppSize === 1 ? '  ' : 's'
      } long!\n\`\`\`${pp}\`\`\``,
      color
    }
    message.reply({ embeds: [embed] })
  }
}
