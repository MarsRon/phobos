import { Message } from 'discord.js'
import config from '../../config'

const { embed: { avatar, color, url } } = config

const answers = [
  'Yes',
  'No',
  'Maybe...',
  'Never',

  // Taken from https://www.ifate.com/fateball.html?fb=1 :)
  'Ask again later.',
  'It is certain',
  'It is decidedly so',
  'Without a doubt',
  'Yes, definitely',
  'You may rely on it',
  'As I see it, yes',
  'Most likely',
  'Outlook good',
  'Signs point to yes',
  'Reply hazy try again',
  'Ask again later',
  'Better not tell you now',
  'Cannot predict now',
  'Concentrate and ask again',
  "Don't count on it",
  'My reply is no',
  'My sources say no',
  'Outlook not so good',
  'Very doubtful'
]

const getAnswer = () => answers[Math.floor(Math.random() * answers.length)]

export default {
  name: '8ball',
  alias: ['8b'],
  description: 'Ask 8Ball anything. 8Ball answers anything.',
  args: true,
  usage: '<question>',
  execute (message: Message, args: string[]) {
    message.reply({
      embed: {
        description: `Question: ${args.join(' ')}\nAnswer: ${getAnswer()}`,
        color,
        author: { name: '8Ball', url, icon_url: avatar }
      }
    })
  }
}
