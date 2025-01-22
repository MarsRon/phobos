const { DisTube, formatDuration, Queue, Song, Playlist } = require('distube')
const { YouTubePlugin } = require('@distube/youtube')
const { DirectLinkPlugin } = require('@distube/direct-link')
const { Message } = require('discord.js')
const client = require('../client')
const { inspect } = require('util')
const config = require('../config')
const { getQueueStatus } = require('../utils')

const { avatar, color, url } = config.embed

// Create a DisTube client
const distube = new DisTube(client, {
  emitNewSongOnly: true,
  plugins: [
    new YouTubePlugin(),
    new DirectLinkPlugin()
  ]
})

/**
 * Get the estimated time until playing
 * @param {Queue} queue - DisTube Queue
 * @param {Song} song - Added song
 * @returns {number} seconds
 */
const estimatedTimeUntilPlaying = (queue, song) =>
  queue.songs.reduce(
    // Add all song duration up until added song
    (acc, cur, i) =>
      i < queue.songs.findIndex(s => s.name === song.name)
        ? acc + cur.duration
        : acc,
    // Calculate time left for current song
    -Math.floor(queue.currentTime)
  )

/**
 * @type {Record<string, () => void>}
 */
const events = {
  /**
   * Autoplay
   * @param {Queue} queue - DisTube Queue
   */
  initQueue (queue) {
    queue.autoplay = true
  },

  /**
   * When a song starts playing
   * @param {Queue} queue - DisTube Queue
   * @param {Song} song - DisTube Song
   */
  playSong (queue, song) {
    const { name, url: songUrl, formattedDuration, user, thumbnail } = song

    client.log.info(
      `DisTube play song: ${JSON.stringify({
        user: user.tag,
        id: user.id,
        guild: queue.textChannel.guild.name,
        guildId: queue.textChannel.guildId,
        songName: name,
        url: songUrl
      })}`
    )

    const embed = {
      description: `[${name}](${songUrl}) - ${formattedDuration}

Requested by: ${user} (${user.tag})

${getQueueStatus(queue)}`,
      color,
      thumbnail: { url: thumbnail },
      author: { name: 'Now Playing ♪', url, icon_url: avatar }
    }

    queue.textChannel.send({ embeds: [embed] })
  },

  /**
   * When a song is added to the queue
   * @param {Queue} queue - DisTube Queue
   * @param {Song} song - DisTube Song
   */
  addSong (queue, song) {
    const { name, url: songUrl, formattedDuration, thumbnail, user } = song

    const embed = {
      title: name,
      url: songUrl,
      fields: [
        ['Song Duration', formattedDuration],
        [
          'Estimated time until playing',
          formatDuration(estimatedTimeUntilPlaying(queue, song))
        ],
        [
          'Position in queue',
          queue.songs.findIndex(s => s.name === name).toLocaleString()
        ]
      ].map(([name, value]) => ({ name, value, inline: true })),
      color,
      thumbnail: { url: thumbnail },
      author: {
        name: 'Added to queue ♪',
        url,
        icon_url: user.displayAvatarURL()
      }
    }

    queue.textChannel.send({ embeds: [embed] })
  },

  /**
   * When a playlist is added to the queue
   * @param {Queue} queue - DisTube Queue
   * @param {Playlist} playlist - DisTube Playlist
   */
  addList (queue, playlist) {
    const { name, url: listUrl, formattedDuration, thumbnail, user } = playlist

    const embed = {
      title: `${name} (${playlist.songs.length} songs)`,
      url: listUrl,
      fields: [
        ['Song Duration', formattedDuration],
        [
          'Estimated time until playing',
          formatDuration(estimatedTimeUntilPlaying(queue, playlist.songs[0]))
        ],
        [
          'Position in queue',
          queue.songs
            .findIndex(s => s.name === playlist.songs[0].name)
            .toLocaleString()
        ]
      ].map(([name, value]) => ({ name, value, inline: true })),
      color,
      thumbnail: { url: thumbnail },
      author: {
        name: 'Added to queue ♪',
        url,
        icon_url: user.displayAvatarURL()
      }
    }

    queue.textChannel.send({ embeds: [embed] })
  },

  /**
   * When using search
   * @param {Message} message - Discord.js Message
   * @param {Playlist} results - Search results
   */
  searchResult (message, results) {
    const formattedResults = results
      .map((song, i) => {
        const { name, url: songUrl, formattedDuration } = song
        return `**${i + 1}.** [${name}](${songUrl}) - ${formattedDuration}`
      })
      .join('\n')

    message.reply(`**Please choose an option from below**
${formattedResults}
*Enter anything else or wait 60 seconds to cancel*`)
  },

  /**
   * When search is canceled
   * @param {Message} message - Discord.js Message
   */
  searchCancel (message) {
    message.reply(':white_check_mark:')
  },

  /**
   * When error occurs
   * @param {Error} error - Error
   * @param {Queue} queue - DisTube Queue
   * @param {Song} song - DisTube Song
   */
  error (error, queue, song) {
    const channel = queue.textChannel

    // console.log('message: ',error.message)
    // console.log('name: ',error.name)
    // console.log('code: ',error.code)
    // console.log('errorCode: ',error.errorCode)
    // console.log(Object.keys(error))
    
    // No results
    if (error.message === 'No result found') {
      return channel.send(':x: Sorry, I found nothing ¯\\_(ツ)_/¯')
    }

    if (error.code === 'UNAVAILABLE_VIDEO') {
      return channel.send(':x: Sorry, this video is unavailable')
    }

    if (error.name === 'PlayError') {
      switch (error.message.replace(/^https?:\/\/\S+?\n/, '')) {
        // NSFW stuff
        case 'Sign in to confirm your age':
          return channel.send(':x: Sorry mate, no NSFW stuff')
        // Unknown playlist
        case 'Unknown Playlist':
          return channel.send(':x: Sorry, unknown playlist')
      }
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
  },

  /**
   * Emitted for logging FFmpeg debug information.
   * @param {string} debug - FFmpeg debug information.
   */
  ffmpegDebug (debug) {
    client.log.debug(debug)
  }
}

for (const [event, listener] of Object.entries(events)) {
  distube.on(event, listener)
}

module.exports = client.distube = distube
