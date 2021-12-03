const config = require('../../config')

const { avatar, color, url } = config.embed

const shuffleArray = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// I think this is round robin algorithm
const getTeams = (players, n = 1) => {
  // for some reason you can't do
  // Array(n).fill([])
  // because it references the same array
  const teams = Array(n).fill(1).map(() => [])
  let i = 0
  while (players.length) {
    teams[i].push(players.shift())
    i++
    if (i >= n) i = 0
  }
  return teams
}

module.exports = {
  name: 'team',
  alias: ['teams', 'teammate', 'teammates'],
  description: 'Let Phobos choose your teammates!',
  args: true,
  usage: '<teamNumber> <player1> <player2>...',
  async execute (message, args) {
    const teamNumber = parseInt(args.shift())

    if (args.length < 2 || !teamNumber || teamNumber <= 0) {
      return message.reply(
        `:x: Please enter the arguments correctly:\nUsage: \`${message.prefix}${this.name} ${this.usage}\``
      )
    }

    const players = shuffleArray([...args])
    const teams = getTeams(players, teamNumber)

    message.reply({
      embeds: [
        {
          title: 'Team Distribution',
          description: teams
            .map((team, index) => `**Team ${index + 1}:** ${team.join(', ')}`)
            .join('\n'),
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
