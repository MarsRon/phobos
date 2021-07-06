import { Message, TextChannel } from 'discord.js'

const delayDelete = (msg: Message, timeout: number) =>
  setTimeout(
    () => msg.delete().catch(() => {}),
    timeout
  )

export default {
  name: 'clear',
  alias: ['purge'],
  description: 'Clears messages with a limit of 100.',
  args: true,
  usage: '<number 1-100>',
  guildOnly: true,
  permission: 'MANAGE_MESSAGES',
  async execute (message: Message, args: string[]) {
    const limit = parseInt(args[0])
    if (isNaN(limit) || limit > 100 || limit < 1) {
      return message.reply(':x: Please enter a number between 1 and 100')
    }

    const { channel } = message
    message.delete()

    const deleted = await (channel as TextChannel).bulkDelete(limit, true)
    channel.send(`Successfully deleted ${deleted.size} messages`)
      .then(msg => delayDelete(msg, 5000))
  }
}
