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
 * @api {post} /users Create User
 * @apiGroup Users
 * @apiName CreateUser
 *
 * @apiParam (Body Parameters) {String} [firstname]  Optional Firstname of the User
 * @apiParam (Body Parameters) {String} [lastname]   Optional Lastname of the User
 *
 * @apiSuccess (Response Fields) {String} firstname Firstname of the User
 * @apiSuccess (Response Fields) {String} lastname  Lastname of the User
 * @apiSuccess (Response Fields) {Object[]} Accounts  Array of Accounts the User owns
 * @apiSuccess (Response Fields) {Number} id  Id of the User
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "firstname": "Michael",
 *       "lastname": "Jordan",
 *       "Accounts": [],
 *       "id": 1
 *     }
 *
 */
apiRoutes.post('/users', usersController.create)

/**
 * @api {get} /users List Users
 * @apiGroup Users
 * @apiName ListUsers
 *
 * @apiSuccess (Response Fields) {String} firstname Firstname of the User
 * @apiSuccess (Response Fields) {String} lastname  Lastname of the User
 * @apiSuccess (Response Fields) {Object[]} Accounts  Array of Accounts the User owns
 * @apiSuccess (Response Fields) {Number} id  Id of the User
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "firstname": "Michael",
 *         "lastname": "Jordan",
 *         "Accounts": [],
 *         "id": 1
 *       },
 *       {
 *         "firstname": "Kobe",
 *         "lastname": "Bryant",
 *         "Accounts": [],
 *         "id": 2
 *       },
 *     ]
 *
 */
apiRoutes.get('/users', usersController.list)

/**
 * @api {get} /users/:id Get User
 * @apiGroup Users
 * @apiName GetUser
 *
 * @apiParam (Path Parameters) {Number} id User's unique ID
 *
 * @apiSuccess (Response Fields) {String} firstname Firstname of the User
 * @apiSuccess (Response Fields) {String} lastname  Lastname of the User
 * @apiSuccess (Response Fields) {Object[]} Accounts  Array of Accounts the User owns
 * @apiSuccess (Response Fields) {Number} id  Id of the User
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "Michael",
 *       "lastname": "Jordan",
 *       "Accounts": [],
 *       "id": 1
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User Not Found"
 *     }
 */
apiRoutes.get('/users/:userId', usersController.retrieve)

/**
 * @api {put} /users/:id Modify User
 * @apiGroup Users
 * @apiName ModifyUser
 *
 * @apiParam (Path Parameters) {Number} id User's unique ID
 *
 * @apiParam (Body Parameters) {String} [firstname]  Optional Firstname of the User
 * @apiParam (Body Parameters) {String} [lastname]   Optional Lastname of the User
 *
 * @apiSuccess (Response Fields) {String} firstname Firstname of the User
 * @apiSuccess (Response Fields) {String} lastname  Lastname of the User
 * @apiSuccess (Response Fields) {Object[]} Accounts  Array of Accounts the User owns
 * @apiSuccess (Response Fields) {Number} id  Id of the User
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "Michael",
 *       "lastname": "Jordan",
 *       "Accounts": [],
 *       "id": 1
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User Not Found"
 *     }
 */
apiRoutes.put('/users/:userId', usersController.update)

/**
 * @api {delete} /users/:id Delete User
 * @apiGroup Users
 * @apiName DeleteUser
 *
 * @apiParam (Path Parameters) {Number} id Users unique ID
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 No Content
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User Not Found"
 *     }
 */
apiRoutes.delete('/users/:userId', usersController.destroy)

apiRoutes.post('/accounts', accountsController.create)

/**
 * @api {get} /accounts List Accounts
 * @apiGroup Accounts
 * @apiName ListAccounts
 *
 * @apiSuccess (Response Fields) {String} currency Currency of the Account
 * @apiSuccess (Response Fields) {Number} balance  Balance of the Account
 * @apiSuccess (Response Fields) {Object[]} Users  Array of Users associated with the Account
 * @apiSuccess (Response Fields) {Number} id  Id of the Account
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "currency": "USD",
 *         "balance": 100.99,
 *         "Users": [],
 *         "id": 1
 *       },
 *       {
 *         "currency": "EUR",
 *         "balance": 100.99,
 *         "Users": [],
 *         "id": 2
 *       },
 *     ]
 */
apiRoutes.get('/accounts', accountsController.list)

/**
 * @api {get} /accounts/:id Get Account
 * @apiGroup Accounts
 * @apiName GetAccount
 *
 * @apiParam (Path Parameters) {Number} id Account's unique ID
 *
 * @apiSuccess (Response Fields) {String} firstname Firstname of the Account
 * @apiSuccess (Response Fields) {String} lastname  Lastname of the Account
 * @apiSuccess (Response Fields) {Object[]} Accounts  Array of Users associated with the Account
 * @apiSuccess (Response Fields) {Number} id  Id of the Account
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "currency": "USD",
 *       "balance": 100.99,
 *       "Users": [],
 *       "id": 1
 *     }
 *
 * @apiError AccountNotFound The id of the Account was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Account Not Found"
 *     }
 */
apiRoutes.get('/accounts/:accountId', accountsController.retrieve)

apiRoutes.put('/accounts/:accountId', accountsController.update)

/**
 * @api {delete} /accounts/:id Delete Account
 * @apiGroup Accounts
 * @apiName DeleteAccount
 *
 * @apiParam (Path Parameters) {Number} id Account's unique ID
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 No Content
 *
 * @apiError AccountNotFound The id of the Account was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Account Not Found"
 *     }
 */
apiRoutes.delete('/accounts/:accountId', accountsController.destroy)

export default apiRoutes
