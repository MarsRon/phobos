import client from '../handlers/client'

export default function (error: Error) {
  client.log.error(error)
}
