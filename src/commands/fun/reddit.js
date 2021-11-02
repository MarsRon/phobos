const axios = require('axios').default
const config = require('../../config')

const { avatar, color } = config.embed

const subreddits = ['meme', 'memes', 'dankmemes', 'animemes', 'shitpost', '196']
const limit = 100

const getUrl = sub =>
  `https://www.reddit.com/r/${sub ??
    subreddits[
      Math.floor(Math.random() * subreddits.length)
    ]}/random/.json?limit=${limit}`

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

    const {
      title,
      permalink,
      subreddit_name_prefixed: sub,
      preview,
      post_hint: postType,
      url_overridden_by_dest: video,
      ups,
      num_comments: comments
    } = post

    if (postType === 'rich:video') {
      return message.reply(video)
    }

    const image =
      preview?.images[0].source.url.replace(/&amp;/g, '&') ?? post.url

    message.reply({
      embeds: [
        {
          title,
          url: `https://reddit.com${permalink}`,
          color,
          author: {
            name: sub,
            url: `https://reddit.com/${sub}`,
            icon_url: avatar
          },
          footer: {
            text: `👍 ${ups} | 💬 ${comments}`
          },
          image: { url: image }
        }
      ]
    })
  }
}
