import { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IBook extends Document {
  id: typeof uuidv4
  title: string
  author: string
  year: number
}
