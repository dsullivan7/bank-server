import 'babel-polyfill'
import path from 'path'
import express from 'express'
import jwt from 'express-jwt'
import jwksRsa from 'jwks-rsa'
import bodyParser from 'body-parser'

import config from './server/config/config'
import routes from './server/routes'
import { expressErrorLogger } from './server/logger'
import { getUser } from './server/utils/routeUtils'

const secret = jwksRsa.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `https://${config.fields.auth0Domain}/.well-known/jwks.json`,
})

const jwtCheck = jwt({
  secret,
  audience: config.fields.auth0ClientId,
  issuer: `https://${config.fields.auth0Domain}/`,
  algorithms: ['RS256'],
})

// Set up the express app
const app = express()

// Parse incoming requests data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// verify the authentication
app.use('/api', jwtCheck)

// retrieve the requesting user from the database
app.use('/api', getUser)

// Inject our routes into the application.
app.use('/api', routes)

// Error logging
app.use(expressErrorLogger)

app.use(express.static(path.join(__dirname, 'public')))

// Default Route
app.get('*', (req, res) => res.status(200).send({
  message: 'Bank Server',
}))

module.exports = app
