import client from '../handlers/client'
import { Message } from 'discord.js'

export default async function (message: Message) {
  client.log.info(`${message.author.tag}: '${message.content}'`)
}
