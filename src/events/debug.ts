import client from '../handlers/client'

export default function (debug: string) {
  client.log.debug(debug)
}
