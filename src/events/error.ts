import client from '../client'

export default function (error: Error) {
  client.log.error(error)
}
