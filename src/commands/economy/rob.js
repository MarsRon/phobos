const { User } = require('../../db')
const { getMemberFromMessage } = require('../../utils')

module.exports = {
  name: 'rob',
  description: 'Rob someone.',
  args: true,
  usage: '<user>',
  guildOnly: true,
  cooldown: 30,
  async execute (message, args) {
    const target = await getMemberFromMessage(message, args[0])
    const { author } = message

    const [authorItem, targetItem] = await Promise.all([
      User.get(author.id),
      User.get(target.id)
    ])

    if (targetItem.get('wallet') <= 0) {
      return message.reply(":x: User doesn't have anything you can rob")
    }

    // VIP perks
    const isVip = Object.keys(authorItem.get('inventory')).some(k =>
      k.startsWith('vip')
    )
    const robable = 100

    // random integer
    const rand = n => Math.floor(Math.random() * n) + 1

    // Punish those who rob themselves lmao
    if (target.id === author.id) {
      const robAmount = Math.min(rand(robable), authorItem.get('wallet'))
      authorItem.inc('wallet', -robAmount)
      authorItem.save()
      return message.reply(
        `Congratulations, you lost **${robAmount}$** because you're stupid enough to rob yourself <:hMmMmMm:748496754382733383>`
      )
    }

    const robAmount = Math.min(
      rand(isVip ? targetItem.get('wallet') : robable),
      targetItem.get('wallet')
    )

    targetItem.inc('wallet', -robAmount)
    targetItem.save()
    authorItem.inc('wallet', robAmount)
    authorItem.save()

    message.reply(`You robbed ${target} and got away with ${robAmount}$`)
  }
}
