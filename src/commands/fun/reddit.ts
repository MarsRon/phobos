import { Message, TextChannel } from 'discord.js'
import axios from 'axios'
import config from '../../config'

const { embed: { avatar, color } } = config

const subreddits = ['meme', 'memes', 'dankmemes']
const limit = 100

const getUrl = (sub?: string) => `https://www.reddit.com/r/${
    sub ?? subreddits[Math.floor(Math.random() * subreddits.length)]
  }/random/.json?limit=${limit}`

export default {
  name: 'reddit',
  alias: ['meme', 'r', 'rdt'],
  description: 'Sends memes from reddit. If no subreddit is specified, it sends random stuff from reddit.',
  usage: '[subreddit]',
  async execute (message: Message, args: string[]) {
    const { data } = await axios.get(getUrl(args[0]))

    let posts: Record<string, any>[] = data[0].data.children

    if (!(message.channel as TextChannel).nsfw) {
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
      downs,
      num_comments: comments
    } = post

    const image = (preview?.images[0].source.url as string)
      .replace('&amp;', '&') ?? post.url

    if (postType === 'rich:video') {
      return message.reply(video)
    }

    message.reply({
      embed: {
        title,
        url: `https://reddit.com${permalink}`,
        color,
        author: {
          name: sub,
          url: `https://reddit.com/${sub}`,
          icon_url: avatar
        },
        footer: {
          text: `👍 ${ups} | 👎 ${downs} | 💬 ${comments}`
        },
        image: { url: image }
      }
    })
  }
}
