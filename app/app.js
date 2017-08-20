import path from 'path'
import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import swaggerJSDoc from 'swagger-jsdoc'

import routes from './server/routes'

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Bank Server API',
    version: '1.0.0',
    description: 'A simple REST API for bank accounts',
  },
}

// Set up the express app
const app = express()

// Log requests to the console.
app.use(logger('dev'))

// Parse incoming requests data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Inject our routes into the application.
app.use('/api', routes)

app.use(express.static(path.join(__dirname, 'public')))

// options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./app/server/routes/*.js'],
}

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options)

// serve api documentation
app.get('/api.json', (req, res) => {
  res.send(swaggerSpec)
})

// Default Route
app.get('*', (req, res) => res.status(200).send({
  message: 'Bank Server',
}))

module.exports = app
