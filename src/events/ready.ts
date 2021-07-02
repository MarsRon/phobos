import client from '../handlers/client'
import config from '../config'

export const once = true

export default function () {
  const { guilds, user } = client
  client.log.info(`${user!.tag} is online`)
  user!.setActivity(
    `${config.prefix}help | ${guilds.cache.size} Servers`,
    { type: 'PLAYING' }
  )
}
