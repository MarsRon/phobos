const DisTube = require('distube')

const client = require('../client')
const { formatDuration } = require('../utils')
const config = require('../config')

const {
  embed: { avatar, color, url }
} = config

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

  // When a song starts playing
  .on(
    'playSong',
    (
      message,
      queue,
      { name, url: songUrl, formattedDuration, user, thumbnail }
    ) =>
      message.channel.send({
        embed: {
          description: `[${name}](${songUrl}) - \`${formattedDuration}\`

\`Requested by:\` <@${user.id}> (${user.tag})

${getStatus(queue)}`,
          color,
          thumbnail: { url: thumbnail },
          author: { name: 'Now Playing ♪', url, icon_url: avatar }
        }
      })
  )

  // When a new song is added to the queue
  .on(
    'addSong',
    (
      message,
      queue,
      { name: title, url: songUrl, formattedDuration, thumbnail }
    ) =>
      message.channel.send({
        embed: {
          title,
          url: songUrl,
          fields: [
            ['Song Duration', formattedDuration],
            [
              'Estimated time until playing',
              formatDuration(
                queue.songs
                  // Remove currently playing and newly added song
                  .filter((_, i) => i !== 0 && i + 1 !== queue.songs.length)
                  .reduce(
                    // Add all song duration
                    (acc, cur) => acc + cur.duration,
                    // Calculate time left for current song
                    queue.songs[0].duration -
                      Math.floor(queue.currentTime / 1000)
                  ) * 1000
              )
            ],
            ['Position in queue', queue.songs.length - 1]
          ].map(([name, value]) => ({ name, value, inline: true })),
          color,
          thumbnail: { url: thumbnail },
          author: {
            name: 'Added to queue ♪',
            url,
            icon_url: message.author.displayAvatarURL({ dynamic: true })
          }
        }
      })
  )

  // When a playlist is played
  .on('playList', (message, queue, playlist, song) =>
    message.channel.send({
      embed: {
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
          icon_url: message.author.displayAvatarURL({ dynamic: true })
        }
      }
    })
  )

  // When a playlist is added to the queue
  .on('addList', (message, queue, playlist) =>
    message.channel.send(
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
  .on('error', (message, err) => {
    client.log.error(err)
    message.channel.send(`:x: An error occurred: ${err.message}`)
  })

module.exports = client.distube = distube

require('./logger').info('distube handler loaded')
