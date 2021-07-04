import { Guild } from 'discord.js'
import client from '../client'
import config from '../config'
import { inspect } from 'util'

const { activity } = config

export default function (guild: Guild) {
  const { log, user } = client
  user!.setActivity(activity.name(client), activity.options)
  log.info(`Guild removed: ${inspect(guild, { colors: true, depth: 1 })}`)
}
