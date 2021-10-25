const { Schema } = require('mongoose')
const DBManager = require('./DBManager')
const config = require('../config')

const schema = new Schema({
  prefix: String,
  welcomeChannel: String
})

const defaultValues = {
  prefix: config.prefix,
  welcomeChannel: ''
}

const Guild = new DBManager('guild', schema, defaultValues)

module.exports = Guild
