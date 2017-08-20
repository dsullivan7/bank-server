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

/**
 * @swagger
 * definition:
 *   User:
 *     properties:
 *       firstname:
 *         type: string
 *       lastname:
 *         type: string
 *       googleId:
 *         type: string
 *       Accounts:
 *         type: array
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: The newly created user
 *         schema:
 *           $ref: '#/definitions/User'
 */
apiRoutes.post('/users', usersController.create)

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/User'
 */
apiRoutes.get('/users', usersController.list)

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single user
 *         schema:
 *           $ref: '#/definitions/User'
 */
apiRoutes.get('/users/:userId', usersController.retrieve)

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     description: Updates a single user
 *     produces: application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: The newly updated user
 *         schema:
 *           $ref: '#/definitions/User'
 */
apiRoutes.put('/users/:userId', usersController.update)

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     description: Deletes a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Users's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       204:
 *         description: Successfully deleted
 */
apiRoutes.delete('/users/:userId', usersController.destroy)


/**
 * @swagger
 * definition:
 *   Account:
 *     properties:
 *       currency:
 *         type: string
 *       balance:
 *         type: float
 *       Users:
 *         type: array
 */

/**
 * @swagger
 * /api/accounts:
 *   post:
 *     tags:
 *       - Accounts
 *     description: Creates a new account
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: Account object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Account'
 *     responses:
 *       201:
 *         description: The newly created account
 *         schema:
 *           $ref: '#/definitions/Account'
 */
apiRoutes.post('/accounts', accountsController.create)


/**
 * @swagger
 * /api/accounts:
 *   get:
 *     tags:
 *       - Accounts
 *     description: Returns all accounts
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of accounts
 *         schema:
 *           $ref: '#/definitions/Account'
 */
apiRoutes.get('/accounts', accountsController.list)

/**
 * @swagger
 * /api/accounts/{id}:
 *   get:
 *     tags:
 *       - Accounts
 *     description: Returns a single account
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Account's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single account
 *         schema:
 *           $ref: '#/definitions/Account'
 */
apiRoutes.get('/accounts/:accountId', accountsController.retrieve)

/**
 * @swagger
 * /api/accounts/{id}:
 *   put:
 *     tags:
 *       - Accounts
 *     description: Updates a single account
 *     produces: application/json
 *     parameters:
 *       - name: account
 *         description: Account object
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/Account'
 *       - name: users
 *         description:
 *         in: body,
 *     responses:
 *       200:
 *         description: The newly updated account
 *         schema:
 *           $ref: '#/definitions/Account'
 */
apiRoutes.put('/accounts/:accountId', accountsController.update)

/**
 * @swagger
 * /api/accounts/{id}:
 *   delete:
 *     tags:
 *       - Accounts
 *     description: Deletes a single account
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Account's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       204:
 *         description: Successfully deleted
 */
apiRoutes.delete('/accounts/:accountId', accountsController.destroy)

export default apiRoutes
