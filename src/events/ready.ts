import client from '../client'
import config from '../config'

const { activity } = config

export const once = true

export default function () {
  const { log, user } = client
  user!.setActivity(activity.name(client), activity.options)
  log.info(`${user!.tag} is online`)
}
