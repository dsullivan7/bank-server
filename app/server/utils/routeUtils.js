import models from '../models'

const User = models.User

const getUser = (req, res, next) => {
  User.findOrCreate({ where: { auth0Id: res.user.sub }, include: 'Accounts' })
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
}

module.exports = {
  getUser,
}
