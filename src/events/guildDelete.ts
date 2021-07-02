import { Guild } from 'discord.js'
import client from '../handlers/client'
import config from '../config'

export default function (guild: Guild) {
  client.user!.setActivity(
    `${config.prefix}help | ${client.guilds.cache.size} Servers`,
    { type: 'PLAYING' }
  )
  client.log.info(`Guild removed: ${guild.name} ${guild.id}`)
}
