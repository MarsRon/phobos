const axios = require('axios').default
const { EmbedBuilder } = require('discord.js')
const config = require('../../config')

const { avatar, color } = config.embed

const subreddits = [
  'meme',
  'memes',
  'dankmemes',
  'me_irl',
  'animemes',
  'shitpost',
  '196',
  'comedyheaven'
]
const limit = 100

const getUrl = sub =>
  `https://www.reddit.com/r/${
    sub ?? subreddits[Math.floor(Math.random() * subreddits.length)]
  }/random/.json?limit=${limit}`

const parseRedditPost = post => {
  const {
    title,
    permalink,
    subreddit_name_prefixed: sub,
    ups,
    num_comments,
    post_hint,
    url_overridden_by_dest,
    selftext,
    preview,
    is_video
  } = post

  const embed = new EmbedBuilder()
    .setTitle(title.slice(0, 255))
    .setURL(`https://reddit.com${permalink}`)
    .setColor(color)
    .setAuthor({ name: sub, iconURL: avatar, url: `https://reddit.com/${sub}` })
    .setFooter({ text: `👍 ${ups} | 💬 ${num_comments}` })

  // Link post
  if (post_hint === 'link') {
    return embed.setDescription(url_overridden_by_dest)
  }

  // Text post
  if (selftext) {
    return embed.setDescription(selftext.slice(0, 4095))
  }

  // Image/video post
  const image = preview?.images[0].source.url.replace(/&amp;/g, '&') ?? post.url

  if (is_video) {
    embed.setDescription('This is a video, check out the original post!')
  }

  return embed.setImage(image)
}

module.exports = {
  name: 'reddit',
  alias: ['meme', 'r'],
  description:
    'Sends memes from reddit. If no subreddit is specified, it sends random stuff from reddit.',
  usage: '[subreddit]',
  cooldown: 5,
  async execute (message, args) {
    const { data } = await axios.get(getUrl(args[0]))

    let posts = data[0].data.children

    if (!message.channel.nsfw) {
      posts = posts.filter(post => !post.data.over_18)
    }

    if (posts.length === 0) {
      return message.reply(":x: Too bad! I can't find anything :/")
    }

    const post = posts[Math.floor(Math.random() * posts.length)].data

    message.reply({ embeds: [parseRedditPost(post)] })
  }
}

// Fixes first request being 403
axios.get(getUrl()).catch(() => {})
