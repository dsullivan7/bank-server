import express from 'express'
import bearerToken from 'express-bearer-token'

import models from '../models'
import googleUtils from '../utils/googleUtils'

import usersController from '../controllers/users'
import accountsController from '../controllers/accounts'

const User = models.User
const apiRoutes = express.Router()

apiRoutes.use(bearerToken())

// route middleware to verify a token
apiRoutes.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.token

  // decode token
  if (token) {
    // verify secret with google
    googleUtils.verifyToken(token)
    .then((payload) => {
      res.locals.googlePayload = payload
      next()
    })
    .catch((err) => {
      console.error(err)
      res.status(403).send({ message: 'Failed to authenticate token' })
    })
  } else {
    res.status(403).send({ message: 'No token provided' })
  }
})

apiRoutes.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Spark API!',
}))

// route middleware to get the user
apiRoutes.use((req, res, next) => {
  User.findOrCreate({ where: { googleId: res.locals.googlePayload.sub }, include: 'Accounts' })
    .spread((user, created) => {
      res.locals.user = user
      if (created) {
        return user.update(
          {
            firstname: res.locals.googlePayload.given_name,
            lastname: res.locals.googlePayload.family_name,
            Accounts: [],
          }, { include: 'Accounts' }).then(() => next())
      }
      return next()
    })
    .catch((err) => {
      console.error('Error creating the user')
      console.error(err)
      res.status(500).send({ message: 'An error occured while creating the user.' })
    })
})

// user routes
apiRoutes.post('/users', usersController.create)
apiRoutes.get('/users', usersController.list)
apiRoutes.get('/users/:userId', usersController.retrieve)
apiRoutes.put('/users/:userId', usersController.update)
apiRoutes.delete('/users/:userId', usersController.destroy)

// account routes
apiRoutes.post('/accounts', accountsController.create)
apiRoutes.get('/accounts', accountsController.list)
apiRoutes.get('/accounts/:accountId', accountsController.retrieve)
apiRoutes.put('/accounts/:accountId', accountsController.update)
apiRoutes.delete('/accounts/:accountId', accountsController.destroy)


export default apiRoutes
