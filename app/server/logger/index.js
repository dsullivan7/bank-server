import winston from 'winston'
import expressWinston from 'express-winston'

import config from '../config/config'

const logger = new winston.Logger({
  level: config.logLevel,
  transports: [
    new winston.transports.Console({ timestamp: true, colorize: true }),
  ],
})

const expressLogger = expressWinston.logger({
  level: config.logLevel,
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true,
    }),
  ],
})

const expressErrorLogger = expressWinston.errorLogger({
  level: config.logLevel,
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true,
    }),
  ],
})

module.exports = {
  logger,
  expressLogger,
  expressErrorLogger,
}
