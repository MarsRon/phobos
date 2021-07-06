import { Message } from 'discord.js'
import axios from 'axios'
import config from '../../config'

const { embed: { color } } = config

const apiUrl = 'https://miku-for.us/api/v2/random'

export default {
  name: 'miku',
  alias: ['hatsune-miku'],
  description: 'Sends a random Hatsune Miku image!',
  cooldown: 5,
  async execute (message: Message) {
    const res = await axios.get(apiUrl)
    message.reply({
      embed: {
        color,
        image: { url: res.data.url as string }
      }
    })
  }
}
