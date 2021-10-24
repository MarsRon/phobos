const { Schema } = require('mongoose')
const DBManager = require('./DBManager')

const schema = new Schema({
  wallet: Number,
  bank: Number
})

const defaultValues = {
  wallet: 100,
  bank: 0
}

const User = new DBManager('user', schema, defaultValues)

module.exports = User
