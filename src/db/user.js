const { Schema } = require('mongoose')
const DBManager = require('./DBManager')

const schema = new Schema({
  wallet: Number,
  bank: Number,
  multiplier: Number,
  inventory: Object,
  lastDaily: Number,
  fishingRodUsage: Number
})

const defaultValues = {
  wallet: 100,
  bank: 0,
  multiplier: 1,
  inventory: {},
  lastDaily: 0,
  fishingrodUsage: 0
}

const User = new DBManager('user', schema, defaultValues)

module.exports = User
