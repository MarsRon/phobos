module.exports = {
  name: 'poop',
  alias: ['💩'],
  description: 'Poop 💩',
  async execute (message) {
    message.react('💩')
    message.reply('Poop 💩')
      .then(msg => msg.react('💩'))
  }
}
