const { MessageActionRow, MessageButton } = require('discord.js')
const config = require('../../config')

const { color } = config.embed

/**
 * Split array into N items per chunks
 * @param {Array} array - Input array
 * @param {number} chunk - Number of elements per chunk
 * @returns {Array[]}
 */
const arrayChunks = (array, chunk) =>
  array.reduce((all, item, i) => {
    const ch = Math.floor(i / chunk)
    if (!all[ch]) all[ch] = []
    all[ch].push(item)
    return all
  }, [])

module.exports = {
  name: 'queue',
  alias: ['q'],
  description: 'Shows the all the songs of the queue.',
  guildOnly: true,
  async execute (message) {
    const {
      author,
      client: { distube },
      guild
    } = message

    const queue = distube.getQueue(message)
    if (!queue) {
      return message.reply(
        `:x: **I am not playing music. Use** \`${message.prefix}play\`** to play some music!**`
      )
    }

    const songs = arrayChunks(
      queue.songs.map(
        ({ name, url, formattedDuration, user }, index) =>
          `\`${index}.\` [${name}](${url}) | \`${formattedDuration}\` Requested by: <@${user.id}> (${user.tag})`
      ),
      5
    )

    const pages = songs.map((chunk, index) => ({
      embeds: [
        {
          title: `Queue for ${guild.name}`,
          description: `**Now Playing:**\n${chunk.join('\n')}${
            songs.length > 1 ? `\nPage ${index + 1} / ${songs.length}` : ''
          }`,
          color,
          footer: {
            text: `Volume: ${queue.volume}% | Filter: ${queue.filter ||
              '❌'} | Loop: ${
              queue.repeatMode
                ? queue.repeatMode === 2
                  ? 'Entire Queue'
                  : 'This Song'
                : '❌'
            } | Autoplay: ${queue.autoplay ? 'On' : '❌'}`,
            icon_url: author.displayAvatarURL({ dynamic: true })
          }
        }
      ],
      components:
        songs.length > 1
          ? [
              new MessageActionRow().addComponents(
                new MessageButton()
                  .setCustomId('prev')
                  .setLabel('Previous')
                  .setEmoji('⬅')
                  .setStyle('PRIMARY'),
                new MessageButton()
                  .setCustomId('next')
                  .setLabel('Next')
                  .setEmoji('➡')
                  .setStyle('PRIMARY')
              )
            ]
          : null
    }))

    const msg = await message.reply(pages[0])
    if (songs.length > 1) {
      embedPager(msg, pages, message.author)
    }
  }
}

function embedPager (message, pages, user) {
  const pageResolver = (pages, pageIndex, id) => {
    if (id === 'prev') return pageIndex > 0 ? pageIndex - 1 : pages.length - 1
    if (id === 'next') return pageIndex + 1 < pages.length ? pageIndex + 1 : 0
    return pageIndex
  }
  let pageIndex = 0
  const collector = message.createMessageComponentCollector({
    filter: i =>
      ['prev', 'next'].includes(i.customId) && i.user.id === user.id,
    componentType: 'BUTTON',
    time: 60000
  })
  collector.on('collect', async int => {
    const currentPage = pageIndex
    pageIndex = pageResolver(pages, pageIndex, int.customId)
    if (!message.deleted && currentPage !== pageIndex) {
      int.update(pages[pageIndex])
    }
  })
}
