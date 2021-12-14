const { User } = require('../../db')

const fishes = [
  'Yellow Fish :tropical_fish:',
  'Fat Fish :blowfish:',
  'Blue Fish :fish:',
  'Coconut :coconut:',
  'Dolphin :dolphin:',
  'Lobster :lobster:',
  'Shark :shark:',
  'Crab :crab:',
  'Squid :squid:',
  'Whale :whale2:',
  'Shrimp :shrimp:',
  'Octopus :octopus:',
  'Duck :duck:',
  'Diamond :gem:',
  'Cri fish <:cri:745563112106754129>'
]

/**
 * Random integer from min to max
 * @param {number} min Min integer
 * @param {number} max Max integer
 * @returns {number}
 */
const rand = (min, max) =>
  max !== undefined
    ? Math.floor(Math.random() * (max - min)) + min
    : Math.floor(Math.random() * min)

module.exports = {
  name: 'fish',
  description: 'Use a fishing rod to get fishes and treasures.',
  cooldown: 15,
  async execute (message) {
    const { author, prefix } = message
    const item = await User.get(author.id)
    const { inventory, fishingrodUsage } = item.data()

    if (inventory.fishingrod === undefined || inventory.fishingrod === 0) {
      return message.reply(
        `:x: You need to buy a fishing rod from the store. Use \`${prefix}buy fishingrod\` to buy one`
      )
    }

    item.inc('fishingrodUsage', 1)

    const fish = fishes[rand(fishes.length - 1)]
    message.reply(`Congratulations, you've caught a ${fish}!`)

    if (fishingrodUsage >= rand(2, 5)) {
      inventory.fishingrod--
      item.set('inventory', inventory)
      item.set('fishingrodUsage', 0)
      if (inventory.fishingrod === 0) {
        message.reply(
          `Your fishing rod broke and you ran out of fishing rods. Use \`${prefix}buy fishingrod\` to buy a new one`
        )
      } else {
        message.reply('Your fishing rod broke')
      }
    }

    item.save()
  }
}
