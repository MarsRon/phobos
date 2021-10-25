const mongoose = require('mongoose')
const logger = require('../handlers/logger')

mongoose.pluralize(null)

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

db.once('open', () => {
  logger.info(`Connected to MongoDB database: ${db.user}@${db.name}`)
})

db.on('error', err => {
  logger.error(err)
})

const DBManager = require('./DBManager')
const User = require('./user')
const Guild = require('./guild')

module.exports = { DBManager, User, Guild }
