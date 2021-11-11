const delayDelete = (msg, timeout) =>
  setTimeout(() => msg.delete().catch(() => {}), timeout)

module.exports = {
  name: 'clear',
  alias: ['purge'],
  description: 'Clears messages with a limit of 100.',
  args: true,
  usage: '<number 1-100>',
  guildOnly: true,
  permission: 'MANAGE_MESSAGES',
  async execute (message, args) {
    const limit = parseInt(args[0])
    if (isNaN(limit) || limit > 100 || limit < 1) {
      return message.reply(':x: Please enter a number between 1 and 100')
    }

    const { channel } = message
    message.delete()

    const deleted = await channel.bulkDelete(limit, true)
    channel
      .send(`Successfully deleted ${deleted.size} messages`)
      .then(msg => delayDelete(msg, 5000))
  }
}
