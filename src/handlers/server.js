// I'm using nginx as a reverse proxy to proxy port 8001
// You need to set up your reverse proxy yourself ¯\_(ツ)_/¯

const express = require('express')
const logger = require('./logger')

const app = express()
// In case I ever need to change the port
const port = process.env.PORT || 8001

// Static serve
app.use(express.static('site'))
app.use('/assets', express.static('assets'))

// Redirect 404 requests to root
app.all('*', (req, res) => {
  res.redirect('/')
})

// Start server
app.listen(port, () =>
  logger.info(`Webserver running on https://localhost:${port}`)
)
