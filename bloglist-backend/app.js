const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

// Connecting to DB
logger.info('connecting to', config.mongoUrl)
mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })
// ----------------

app.use(cors())
// app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)

// Add methods for the testing server
if (process.env.NODE_ENV === 'test') {
  console.log('*** TEST ENV STARTING ***')
  const testingRouter = require('./tests/testing_controller')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app