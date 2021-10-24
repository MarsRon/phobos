module.exports = {
  name: 'pick',
  description:
    'Let Phobos help you pick something. Add ` or ` between your choices.',
  args: true,
  usage: '<a or b or c or ...>',
  execute (message, args) {
    const choices = args.join(' ').split(/ or /)
    message.reply(choices[Math.floor(Math.random() * choices.length)])
  }
}
