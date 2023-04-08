const { ActionRowBuilder, ButtonBuilder, Message, ComponentType, ButtonStyle } = require('discord.js')
const config = require('../../config')
const { getQueueStatus } = require('../../utils')

const { color } = config.embed

/**
 * Split array into N items per chunks
 * @param {Array} array - Input array
 * @param {number} number - Number of elements per chunk
 * @returns {Array[]}
 */
const arrayChunks = (array, number) =>
  array.reduce((all, item, i) => {
    const chunk = Math.floor(i / number)
    if (!all[chunk]) all[chunk] = []
    all[chunk].push(item)
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
          `**${index}.** [${name}](${url}) - ${formattedDuration} Requested by: ${user} (${user.tag})`
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
            text: getQueueStatus(queue),
            icon_url: author.displayAvatarURL({ dynamic: true })
          }
        }
      ],
      components:
        songs.length > 1
          ? [
              new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                  .setCustomId('prev')
                  .setLabel('Previous')
                  .setEmoji('⬅')
                  .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                  .setCustomId('next')
                  .setLabel('Next')
                  .setEmoji('➡')
                  .setStyle(ButtonStyle.Primary)
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

/**
 * Embed pagination
 * @param {Message} message Discord.js Message
 * @param {Message[]} pages Array of Message
 * @param {User} user Discord.js User
 */
function embedPager (message, pages, user) {
  const pageResolver = (pages, pageIndex, id) => {
    if (id === 'prev') return pageIndex > 0 ? pageIndex - 1 : pages.length - 1
    if (id === 'next') return pageIndex + 1 < pages.length ? pageIndex + 1 : 0
    return pageIndex
  }
  let pageIndex = 0
  const collector = message.createMessageComponentCollector({
    filter: i => ['prev', 'next'].includes(i.customId) && i.user.id === user.id,
    componentType: ComponentType.Button,
    time: 60000
  })
  collector.on('collect', async int => {
    const currentPage = pageIndex
    pageIndex = pageResolver(pages, pageIndex, int.customId)
    if (!message.deleted && currentPage !== pageIndex) {
      int.update(pages[pageIndex])
    }
  })
  collector.on('end', (collected, reason) => {
    if (reason === 'messageDelete') message.deleted = true
  })
}
