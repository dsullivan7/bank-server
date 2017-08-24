import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

import sequelizeJSON from '../config/sequelizeConfig.json'
import config from '../config/config'

const basename = path.basename(module.filename)
const sequelizeConfig = sequelizeJSON[config.env]

const db = {}

const sequelize = new Sequelize(process.env[sequelizeConfig.use_env_variable], sequelizeConfig)

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
