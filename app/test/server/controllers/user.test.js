/* eslint-env node, jest */

import request from 'supertest'
import Umzug from 'umzug'
import db from '../../../server/models'
import app from '../../../app'

const umzug = new Umzug({
  storage: 'sequelize',

  storageOptions: {
    sequelize: db.sequelize,
  },

  migrations: { path: 'app/server/migrations', params: [db.sequelize.getQueryInterface(), db.Sequelize] },
})

jest.mock('express-jwt', () => jest.fn().mockReturnValue((req, res, next) => {
  req.user = {
    sub: 'madeup',
    given_name: 'MyFirstName',
    family_name: 'MyLastName',
  }
  next()
}))

beforeAll(async () => {
  await db.sequelize.drop()
})

beforeEach(async () => {
  // excutes migrations
  await umzug.up()
})

afterEach(async () => {
  await db.sequelize.drop()
})

describe('user model', () => {
  test('should return the logged in user', async () => {
    await db.User.create({
      firstName: 'Firstname',
      lastName: 'Lastname',
      auth0Id: 'madeup' })

    const res = await request(app).get('/api/users/me')

    expect(res.statusCode).toBe(200)
    expect(res.body.firstName).toBe('Firstname')
    expect(res.body.lastName).toBe('Lastname')
    expect(res.body.auth0Id).toBe('madeup')
    expect(res.body.Accounts.length).toBe(0)
  })

  test('should create and return the logged in user', async () => {
    const res = await request(app).get('/api/users/me')

    expect(res.statusCode).toBe(200)
    expect(res.body.firstName).toBe('MyFirstName')
    expect(res.body.lastName).toBe('MyLastName')
    expect(res.body.auth0Id).toBe('madeup')
    expect(res.body.Accounts.length).toBe(0)
  })

  test('should get a user', async () => {
    const user = await db.User.create({ firstName: 'Firstname', lastName: 'Lastname' })
    const res = await request(app).get(`/api/users/${user.id}`)

    expect(res.statusCode).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.firstName).toBe('Firstname')
    expect(res.body.lastName).toBe('Lastname')
    expect(res.body.Accounts.length).toBe(0)
  })

  test('should create a user', async () => {
    const res = await request(app).post('/api/users').send({ firstName: 'Firstname', lastName: 'Lastname' })
    const user = await db.User.findById(res.body.id, { include: 'Accounts' })

    expect(res.statusCode).toBe(201)
    expect(res.type).toBe('application/json')
    expect(res.body.firstName).toBe('Firstname')
    expect(res.body.lastName).toBe('Lastname')
    expect(res.body.Accounts.length).toBe(0)
    expect(user.firstName).toBe('Firstname')
    expect(user.lastName).toBe('Lastname')
    expect(user.Accounts.length).toBe(0)
  })

  test('should list all users', async () => {
    await db.User.create({ firstName: 'Firstname1', lastName: 'Lastname1', auth0Id: 'madeup' })
    await db.User.create({ firstName: 'Firstname2', lastName: 'Lastname2' })
    const res = await request(app).get('/api/users')

    expect(res.statusCode).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.length).toBe(2)
    expect(res.body[0].firstName).toBe('Firstname1')
    expect(res.body[0].lastName).toBe('Lastname1')
    expect(res.body[0].Accounts.length).toBe(0)
    expect(res.body[1].firstName).toBe('Firstname2')
    expect(res.body[1].lastName).toBe('Lastname2')
    expect(res.body[1].Accounts.length).toBe(0)
  })

  test('should modify a user', async () => {
    let user = await db.User.create({ firstName: 'Firstname1', lastName: 'Lastname1' })
    const res = await request(app).put(`/api/users/${user.id}`).send(
      {
        firstName: 'DifferentFirstname',
        lastName: 'DifferentLastname',
      })

    user = await db.User.findById(user.id)

    expect(res.statusCode).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.firstName).toBe('DifferentFirstname')
    expect(res.body.lastName).toBe('DifferentLastname')
    expect(user.firstName).toBe('DifferentFirstname')
    expect(user.lastName).toBe('DifferentLastname')
  })

  test('should delete a user', async () => {
    const user = await db.User.create({ firstName: 'Firstname', lastName: 'Lastname' })
    const res = await request(app).delete(`/api/users/${user.id}`)
    const foundUser = await db.User.findById(user.id)

    expect(res.statusCode).toBe(204)
    expect(foundUser).toBe(null)
  })
})
