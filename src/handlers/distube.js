const DisTube = require('distube')
const { inspect } = require('util')

const client = require('../client')
const { formatDuration } = require('distube/dist/util')
const config = require('../config')

const { avatar, color, url } = config.embed

/**
 * Get the queue status
 * @param {Object} queue - DisTube Queue
 * @returns {string} - status
 */
const getStatus = queue =>
  `Volume: ${queue.volume}% | Filter: ${queue.filter ?? '❌'} | Loop: ${
    queue.repeatMode
      ? queue.repeatMode === 2
        ? 'All Queue'
        : 'This Song'
      : '❌'
  } | Autoplay: ${queue.autoplay ? 'On' : '❌'}`

// Create a DisTube client
const distube = new DisTube.DisTube(client, {
  emitNewSongOnly: true,
  updateYouTubeDL: false
})

distube
  // Autoplay
  .on('initQueue', queue => {
    queue.autoplay = true
  })

  // When a song starts playing
  .on(
    'playSong',
    (queue, { name, url: songUrl, formattedDuration, user, thumbnail }) => {
      client.log.info(
        `DisTube play song: ${JSON.stringify({
          user: user.tag,
          id: user.id,
          guild: queue.textChannel.guild.name,
          guildId: queue.textChannel.guildId,
          songName: name,
          url: songUrl,
        })}`
      )
      queue.textChannel.send({
        embeds: [
          {
            description: `[${name}](${songUrl}) - \`${formattedDuration}\`

\`Requested by:\` <@${user.id}> (${user.tag})

${getStatus(queue)}`,
            color,
            thumbnail: { url: thumbnail },
            author: { name: 'Now Playing ♪', url, icon_url: avatar }
          }
        ]
      })
    }
  )

  // When a new song is added to the queue
  .on(
    'addSong',
    (
      queue,
      { name: title, url: songUrl, formattedDuration, thumbnail, user }
    ) =>
      queue.textChannel.send({
        embeds: [
          {
            title,
            url: songUrl,
            fields: [
              ['Song Duration', formattedDuration],
              [
                'Estimated time until playing',
                formatDuration(
                  queue.songs.reduce(
                    // Add all song duration up until added song
                    (acc, cur, i) =>
                      i < queue.songs.findIndex(s => s.name === title)
                        ? acc + cur.duration
                        : acc,
                    // Calculate time left for current song
                    -Math.floor(queue.currentTime)
                  )
                )
              ],
              [
                'Position in queue',
                queue.songs.findIndex(s => s.name === title).toLocaleString()
              ]
            ].map(([name, value]) => ({ name, value, inline: true })),
            color,
            thumbnail: { url: thumbnail },
            author: {
              name: 'Added to queue ♪',
              url,
              icon_url: user.displayAvatarURL({ dynamic: true })
            }
          }
        ]
      })
  )

  // When a playlist is played
  .on('playList', (queue, playlist, song) =>
    queue.textChannel.send({
      embeds: [
        {
          description: `Play \`${playlist.name}\` playlist (${
            playlist.songs.length
          } songs).
Requested by: ${song.user}
Now playing \`${song.name}\` - \`${song.formattedDuration}\`
${getStatus(queue)}`,
          color,
          author: {
            name: 'Playlist added to queue ♪',
            url,
            icon_url: song.user.displayAvatarURL({ dynamic: true })
          }
        }
      ]
    })
  )

  // When a playlist is added to the queue
  .on('addList', (queue, playlist) =>
    queue.textChannel.send(
      `Added \`${playlist.name}\` playlist (${
        playlist.songs.length
      } songs) to queue\n${getStatus(queue)}`
    )
  )

  // When a music search is used
  .on('searchResult', (message, result) =>
    message.reply(`**Choose an option from below**
${result
  .map(
    (song, i) => `**${i + 1}.** ${song.name} - \`${song.formattedDuration}\``
  )
  .join('\n')}
*Enter anything else or wait 60 seconds to cancel*`)
  )

  // When the search is canceled
  .on('searchCancel', message => message.reply(':white_check_mark:'))

  // When error occurs
  .on('error', (channel, error) => {
    if (error.message === 'No result found') {
      return channel.send(':x: Sorry I found nothing ¯\\_(ツ)_/¯')
    }
    if (
      error.name === 'PlayError' &&
      error.message.replace(/^https?:\/\/\S+?\n/, '') ===
        'Sign in to confirm your age'
    ) {
      return channel.send(':x: Sorry mate, no NSFW stuff')
    }

    client.log.error(error)
    channel.send(':x: Sorry, something went wrong ¯\\_(ツ)_/¯')
    const { author, guild } = channel.lastMessage
    client.logChannel.send({
      embeds: [
        {
          title: 'Distube Error',
          description: '```js\n' + inspect(error).slice(0, 4086) + '```',
          url: channel.lastMessage.url,
          color: 0xff0000,
          fields: [
            ['User', `${author} (${author.tag})`],
            ['Guild', `${guild.name} (${guild.id})`]
          ].map(([name, value]) => ({ name, value, inline: true }))
        }
      ]
    })
  })

module.exports = client.distube = distube
