import http from 'http'
import app from '../app'
import { logger } from '../server/logger'

const port = process.env.PORT || 8000

app.set('port', port)

const server = http.createServer(app)
server.listen(port)

logger.info(`Bank Server has started on port ${port}`)
