import { Message } from 'discord.js'
import emoji from '../../emoji.json'

export default {
  name: 'covid',
  alias: ['covid19', 'covid-19', 'coronavirus'],
  description: 'COVID-19 Statistics for Malaysia.',
  execute (message: Message) {
    message.reply(`**COVID-19 Statistics for Malaysia**
Sorry idk how to fetch data just visit this website ${emoji.cri}
<https://www.outbreak.my>`)
  }
}
