import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

import { config } from 'dotenv'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import bodyParser from 'body-parser'
import router from './routers'
import MongoConnect from './database/mongo.database'
import { Http } from './type'
import errorHandler from './helpers/error.catch'

export type UserSocket = { [key: string]: { socket_id: string } }

config()
const app = express()

MongoConnect.Connect()

app.use(helmet())
app.use(compression())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', process.env.CLIENT_URL as string], // Cho phép truy cập từ origin này
    methods: ['GET', 'POST', 'DELETE'], // Chỉ cho phép các phương thức GET và POST
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'], // Chỉ
    credentials: true
  })
)

app.use('', router)

app.use((error: Http.ServerError, req: Request, res: Response, next: NextFunction) => {
  return errorHandler(error, req, res, next)
})

const PORT = process.env.PORT || 4001
app.listen(PORT, () => {
  console.log('comming', PORT)
})
