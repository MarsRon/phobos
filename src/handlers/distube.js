const DisTube = require('distube')

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
    (queue, { name, url: songUrl, formattedDuration, user, thumbnail }) =>
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
                    // Add all song duration
                    (acc, cur) => acc + cur.duration,
                    // Calculate time left for current song
                    -Math.floor(queue.currentTime) -
                      queue.songs[queue.songs.length - 1].duration
                  )
                )
              ],
              ['Position in queue', (queue.songs.length - 1).toLocaleString()]
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
      } songs) to queue
${getStatus(queue)}`
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
  .on('error', (channel, err) => {
    client.log.error(err)
    channel.send(`:x: An error occurred: ${err.message}`)
  })

module.exports = client.distube = distube
