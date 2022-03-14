import { IBook } from './../types/books'
import { model, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const bookSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: true,
      default: uuidv4(),
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

export default model<IBook>('Book', bookSchema)
