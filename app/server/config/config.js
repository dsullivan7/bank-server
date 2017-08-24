const env = process.env.NODE_ENV || 'development'
const auth0ClientId = process.env.AUTH0_CLIENT_ID
const auth0Domain = process.env.AUTH0_DOMAIN
const logLevel = process.env.LOG_LEVEL || 'info'

const config = {
  development: {
    auth0ClientId,
    auth0Domain,
    logLevel,
  },
  test: {
    auth0ClientId,
    auth0Domain,
    logLevel,
  },
  production: {
    auth0ClientId,
    auth0Domain,
    logLevel,
  },
}

export default { env, fields: config[env] }
