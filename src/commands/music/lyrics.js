const axios = require('axios').default
const { splitMessage } = require('discord.js').Util
const config = require('../../config')

const { color } = config.embed

module.exports = {
  name: 'lyrics',
  description: 'Finds the lyrics of the current song or a provided song name.',
  usage: '<link|query>',
  cooldown: 5,
  async execute (message, args) {
    let query = args.join(' ')
    const {
      client: { distube },
      guild,
      member,
      author: user
    } = message

    if (query === '' && guild) {
      const queue = distube.getQueue(message)
      if (queue) {
        query = queue.songs[0].title
      } else {
        return message.reply(
          ':x: You need to provide a song name to be searched'
        )
      }
    }
    message.reply(`:mag_right: **Searching lyrics for** \`${query}\``)

    try {
      const { data } = await axios.get(
        `https://some-random-api.ml/lyrics?title=${encodeURIComponent(query)}`
      )

      const { author, links, lyrics, title, thumbnail } = data

      // Split into multiple messages
      const lyricsChunks = splitMessage(lyrics)
      const embeds = lyricsChunks.map((description, index) => {
        const embed = { description, color }
        // If it's first embed, add title and thumbnail
        if (index === 0) {
          embed.title = `${author} - ${title}`
          embed.thumbnail = { url: Object.values(thumbnail)[0] }
          embed.url = Object.values(links)[0]
        }
        // If it's last embed, add footer
        if (index + 1 === lyricsChunks.length) {
          embed.footer = {
            text: `${title} - Requested by ${member?.displayName ??
              user.username}`,
            icon_url: user.displayAvatarURL({ dynamic: true, size: 32 })
          }
        }
        return embed
      })
      for (const embed of embeds) {
        await message.channel.send({ embeds: [embed] })
      }
    } catch (error) {
      message.reply(`:x: ${error.response?.data.error}`)
    }
  }
}
