import express from 'express'
import http from 'http'
import { config } from "./config/config";
import Logging from "./library/Logging";
import { iDatabase } from "./models/Database";
import { router as routerAuthor } from "./routes/Author"

const router = express()

iDatabase
  .connect((err) => {
    if (err) return console.log(err)
    startServer()
  })

function startServer () {

  router.use((req, res, next) => {
    Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}]`)

    res.on('finish', () =>
      Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}]` +
        ` Status: [${res.statusCode}]`))

    next()
  })

  router.use(express.urlencoded({extended: true}))
  router.use(express.json())

  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'localhost')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, ' +
     'Content-Type, Accept, Authorization')

    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
      return res.status(200).json({})
    }

    next()
  })

  router.use('/authors', routerAuthor)

  router.get('/ping', (req, res, next) =>
    res.status(200).json({message: 'pong'}))

  router.use((req, res, next) => {
    const error = new Error('Not found')
    Logging.error(error)

    return res.status(404).json({message: error.message})
  })

  http.createServer(router).listen(config.server.port,
    () => Logging.info(`Server is running on ${config.server.port}`))
}
