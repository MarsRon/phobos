import client from '../client'

export default function (err: Error) {
  client.log.error(err)
}
