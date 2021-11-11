const config = require('../../config')

const { avatar, color, url } = config.embed

const shuffleArray = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const arrayChunks = (arr, size) =>
  Array(Math.ceil(arr.length / size))
    .fill()
    .map((_, index) => index * size)
    .map(begin => arr.slice(begin, begin + size))

module.exports = {
  name: 'team',
  alias: ['teams', 'teammate', 'teammates'],
  description: 'Let Phobos choose your teammates!',
  args: true,
  usage: '<players per team> <player1> <player2>...',
  async execute (message, args) {
    const playersPerTeam = parseInt(args.shift())

    if (args.length < 2 || !playersPerTeam || playersPerTeam <= 0) {
      return message.reply(
        `:x: Please enter the arguments correctly:\nUsage: \`${message.prefix}${this.name} ${this.usage}\``
      )
    }

    const players = shuffleArray([...args])
    const teams = arrayChunks(players, playersPerTeam)

    message.reply({
      embeds: [
        {
          title: 'Team Distribution',
          description: teams.map(
            (team, index) => `**Team ${index + 1}:** ${team.join(', ')}`
          ).join('\n'),
          url,
          color,
          footer: {
            text: 'Have fun :)',
            icon_url: avatar
          }
        }
      ]
    })
  }
}
