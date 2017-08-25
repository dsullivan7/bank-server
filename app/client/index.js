/* eslint-env browser */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import Auth from './auth/Auth'

const auth = new Auth()

ReactDOM.render(<App auth={auth} />, document.getElementById('root'))
