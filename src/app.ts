import * as dotenv from 'dotenv'
import express, { Express } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import booksRoutes from './routes'

dotenv.config()

const { DB_NAME, DB_PARAMS, PROTOCOL, DB_URL, USER, PASSWORD } = process.env
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: true,
  optionsSuccessStatus: 204,
}

const app: express.Application = express()

app.use(cors(corsOptions))
app.use(express.json())

const PORT: string | number = process.env.PORT || 4000

app.use(booksRoutes)

const uri = `${PROTOCOL}://${USER}:${PASSWORD}@${DB_URL}/${DB_NAME}?${DB_PARAMS}`
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose
  .connect(uri)
  .then(() => console.log(`DB  connected`))
  .catch((error) => {
    throw error
  })

export default app
