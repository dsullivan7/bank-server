import http from 'http'
import app from '../app'

const port = parseInt(process.env.PORT, 10) || 8000
const host = process.env.HOST || 'localhost'

app.set('port', port)

const server = http.createServer(app)
server.listen(port, host)

console.log(`Bank Server has started on http://${host}:${port}`)
