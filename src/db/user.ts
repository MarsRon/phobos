import { Schema } from 'mongoose'
import DBManager from './DBManager'

const schema = new Schema({
  wallet: Number,
  bank: Number
})

const defaultValues = {
  wallet: 100,
  bank: 0
}

const User = new DBManager('user', schema, defaultValues)

export default User
