const { ActionRowBuilder, ButtonBuilder } = require('discord.js')
const config = require('../../config')

const { avatar, color, url } = config.embed

const selections = ['rock', 'paper', 'scissors']
const names = [':bricks: Rock', ':page_facing_up: Paper', ':scissors: Scissors']

/**
 * Rock Paper Scissors result
 * @param {number} p1 - Player 1's index
 * @param {number} p2 - Player 2's index
 * @returns {number} - Returns 1 if Player1 wins, -1 if Player2 wins, 0 if draw
 */
const rps = (p1, p2) =>
  p1 === p2
    ? 0 // Tie
    : (p1 === 0 && p2 === 2) || (p1 === 1 && p2 === 0) || (p1 === 2 && p2 === 1)
    ? 1 // Player 1 wins
    : -1 // Player 2 wins

module.exports = {
  name: 'rps',
  alias: ['rock-paper-scissors'],
  description: 'Play rock paper scissors with the bot.',
  cooldown: 5,
  async execute (message) {
    const { author, client } = message

    // Send base message
    const msg = await message.reply({
      content: 'Please choose your move:',
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId('rock')
            .setLabel('Rock')
            .setEmoji('🧱')
            .setStyle('PRIMARY'),
          new ButtonBuilder()
            .setCustomId('paper')
            .setLabel('Paper')
            .setEmoji('📄')
            .setStyle('PRIMARY'),
          new ButtonBuilder()
            .setCustomId('scissors')
            .setLabel('Scissors')
            .setEmoji('✂️')
            .setStyle('PRIMARY')
        )
      ]
    })

    // Collect input
    let int
    try {
      int = await msg.awaitMessageComponent({
        filter: i => selections.includes(i.customId) && i.user.id === author.id,
        componentType: 'BUTTON',
        time: 30000
      })
    } catch (err) {
      return msg.reply(":x: You didn't press the buttons in time.")
    }

    // Get results
    const user = selections.indexOf(int.customId)
    const bot = Math.floor(Math.random() * selections.length)
    const result = rps(user, bot)

    // Send message
    int.update({
      content: null,
      components: [],
      embeds: [
        {
          description: `**Congratulations, ${
            result === 0
              ? "it's a draw"
              : `${result === 1 ? author : client.user} wins`
          }!**`,
          fields: [
            [names[user], author.toString()],
            ['vs', 'vs'],
            [names[bot], client.user.toString()]
          ].map(([name, value]) => ({ name, value, inline: true })),
          color,
          author: { name: 'Rock Paper Scissors', url, icon_url: avatar }
        }
      ]
    })
  }
}
