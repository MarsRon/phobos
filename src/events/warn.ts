import client from '../handlers/client'

export default function (warning: string) {
  client.log.warn(warning)
}
