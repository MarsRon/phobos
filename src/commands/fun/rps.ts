import { Message, Collection, MessageReaction } from 'discord.js'
import config from '../../config'

const { embed: { avatar, color, url } } = config

const emojis = ['🧱', '📄', '✂️']
const names = [':bricks: Rock', ':page_facing_up: Paper', ':scissors: Scissors']

/**
 * Rock Paper Scissors result
 * @param {number} p1 - Player 1's index
 * @param {number} p2 - Player 2's index
 * @returns {number} - Returns 1 if Player1 wins, -1 if Player2 wins, 0 if draw
 */
const rps = (p1: number, p2: number): number =>
  p1 === p2
    ? 0 // Tie
    : (p1 === 0 && p2 === 2) ||
      (p1 === 1 && p2 === 0) ||
      (p1 === 2 && p2 === 1)
        ? 1 // Player 1 wins
        : -1 // Player 2 wins

export default {
  name: 'rps',
  alias: ['rock-paper-scissors'],
  description: 'Play rock paper scissors with the bot.',
  cooldown: 5,
  async execute (message: Message) {
    const { author, channel, client } = message

    // Send base message
    const msg = await message.reply(
      'Please react with :bricks:, :page_facing_up: or :scissors:'
    )

    // React with emojis
    ;(async () => {
      for (const emoji of emojis) {
        await msg.react(emoji)
      }
    })()

    // Collect reactions
    let collected: Collection<string, MessageReaction>
    try {
      collected = await msg.awaitReactions(
        // Filter
        (reaction, user) =>
          emojis.includes(reaction.emoji.name) && user.id === author.id,
        // Options
        { max: 1, time: 15000, errors: ['time'] }
      )
    } catch (err) {
      msg.reply(":x: You didn't react in time.")
      return
    }

    // Get results
    const user = emojis.indexOf(collected!.first()!.emoji.name)
    const bot = Math.floor(Math.random() * emojis.length)
    const result = rps(user, bot)

    // Send message
    channel.send({
      embed: {
        description: `**Congratulations, ${
          result === 0
            ? "it's a draw"
            : `${(result === 1 ? author : client.user!).toString()} wins`
        }!**`,
        fields: [
          [names[user], author.toString()],
          ['vs', 'vs'],
          [names[bot], client.user!.toString()]
        ].map(([name, value]) => ({ name, value, inline: true })),
        color,
        author: { name: 'Rock Paper Scissors', url, icon_url: avatar }
      }
    })

    // React with emojis
    for (const emoji of emojis) {
      await msg.react(emoji)
    }
  }
}
