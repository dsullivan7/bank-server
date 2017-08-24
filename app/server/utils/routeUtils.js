import models from '../models'

const User = models.User

const getUser = (req, res, next) => {
  User.findOrCreate({ where: { auth0Id: req.user.sub }, include: 'Accounts' })
    .spread((user, created) => {
      res.locals.user = user
      if (created) {
        return user.update(
          {
            firstName: req.user.given_name,
            lastName: req.user.family_name,
            Accounts: [],
          },
          { include: 'Accounts' },
        )
      }
      return user
    })
    .then(() => next())
    .catch((err) => {
      console.error('Error creating the logged in user')
      console.error(err)
      res.status(500).send({ message: 'An error occured while creating the user.' })
    })
}

module.exports = {
  getUser,
}
