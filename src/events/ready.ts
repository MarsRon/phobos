import client from '../handlers/client'

export default async function () {
  const { guilds, user } = client
  client.log.info(`${user!.tag} is online`)
  user!.setActivity(
    `${process.env.PREFIX}help | ${guilds.cache.size} Servers`,
    { type: 'PLAYING' }
  )
}
