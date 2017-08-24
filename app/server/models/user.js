module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    auth0Id: DataTypes.STRING,
  })

  User.associate = (models) => {
    User.belongsToMany(models.Account, { through: 'UserAccount' })
  }

  return User
}
