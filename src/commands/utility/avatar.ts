import { Message } from 'discord.js'
import { getUserFromMessage } from '@phobos/utils'
import config from '@phobos/config'

const { embed: { color } } = config

export default {
  name: 'avatar',
  alias: ['av', 'pfp'],
  description: 'Fetches the avatar/profile picture of a user.',
  usage: '[user]',
  async execute (message: Message, args: string[]) {
    const user = await getUserFromMessage(message, args[0])

    const url = user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 })

    message.reply({
      embed: {
        title: 'Avatar',
        url,
        color,
        author: {
          name: user.tag,
          url,
          icon_url: url
        },
        image: { url }
      }
    })
  }
}
