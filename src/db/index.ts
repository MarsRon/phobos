import mongoose from 'mongoose'
import DBManager from './DBManager'
import client from '../handlers/client'

mongoose.pluralize(null)

mongoose.connect(process.env.MONGODB_SRV!, {
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
  client.log.error(`connection error: ${err}`)
})

export default DBManager
