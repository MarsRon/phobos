import { Message, MessageAttachment } from 'discord.js'
import { getUserFromMessage } from 'utils'
import axios from 'axios'

export default {
  name: 'triggered',
  description: "I'm triggered. >:(\n*Wait for a few seconds it's pretty slow*",
  usage: '[user]',
  cooldown: 5,
  async execute (message: Message, args: string[]) {
    const user = await getUserFromMessage(message, args.shift())
    const avatar = user.displayAvatarURL({ format: 'png', size: 256 })
    const { data } = await axios.get(
      'https://some-random-api.ml/canvas/triggered',
      {
        responseType: 'arraybuffer',
        params: { avatar }
      }
    )
    message.reply(
      new MessageAttachment(data, `${user.username}-triggered.gif`)
    )
  }
}
