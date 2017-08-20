import express from 'express'
// import bearerToken from 'express-bearer-token'

// import { verifyToken, getUser } from '../utils/routeUtils'

import usersController from '../controllers/users'
import accountsController from '../controllers/accounts'

const apiRoutes = express.Router()

// apiRoutes.use(bearerToken())

// // route middleware to verify a token
// apiRoutes.use(verifyToken)

// // route middleware to get the logged in user
// apiRoutes.use(getUser)

apiRoutes.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Bank Account API!',
}))

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
