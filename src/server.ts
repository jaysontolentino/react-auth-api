import { NextFunction, Request, Response } from 'express';
import http from 'http'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import config from './config'
import {authRoute, userRoute, postRoute} from './routes'
import createHttpError, { HttpError } from 'http-errors'


async function main() {
  try {
    await startServer()
  } catch (error: any) {
    console.log(error.message)
  }
}

async function startServer() {
  const app: express.Application = express();
  const host = config.server.host
  const port = config.server.port
  
  const httpServer: http.Server = http.createServer(app)

  app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTION"],
    credentials: true,
  }))
  
  app.use(express.json())
  app.use(cookieParser())
  app.use(express.urlencoded({extended: false}))
  
  app.use('/auth', authRoute)
  app.use('/posts', postRoute)
  app.use('/users', userRoute)

  app.use(function(req, res, next) {
    const err = new createHttpError.NotFound()
    next(err)
  })

  app.use(function(err: Error | HttpError, __: Request, res: Response, _: NextFunction) {

    let error = err instanceof HttpError ? err : new createHttpError.InternalServerError(err.message)
    
    res.status(error.statusCode)
    res.json({
      status: error.status,
      error: error.message
    })
  })
  
  httpServer.listen(port, () => {
    console.log(`Server is running at ${host}:${port}`)
  })
}

main()