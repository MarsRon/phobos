import express from 'express'
import client from '../client'

const app = express()
const port = 3000

app.use(express.static('site'))
app.use('/assets', express.static('assets'))

app.listen(port, () =>
  client.log.info(`Webserver running on port ${port}`)
)
