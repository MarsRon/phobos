/* eslint-disable import/first */
import mongoose from 'mongoose'
import client from '../client'

mongoose.pluralize(null)

mongoose.connect(process.env.MONGODB_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const db = mongoose.connection

db.once('open', () => {
  client.log.info(`Connected to MongoDB database: ${db.user}@${db.name}`)
})

db.on('error', (err: any) => {
  client.log.error(err)
})

import DBManager from './DBManager'
import User from './user'

export {
  DBManager,
  User
}
