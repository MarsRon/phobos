import client from '../client'

export default function (warning: string) {
  client.log.warn(warning)
}
