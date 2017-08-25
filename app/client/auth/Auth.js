import auth0 from 'auth0-js'

export default class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'sullivan-bank-server.auth0.com',
      clientID: 'TNg3JDzqcJ9Sd8PcP37ZybgrJW85zZ9p',
      redirectUri: 'http://localhost:8080',
      audience: 'https://sullivan-bank-server.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid email profile',
    })
  }

  login() {
    this.auth0.authorize()
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.idToken) {
        alert(`Your JWT Token is ${authResult.idToken}`)
      } else if (err) {
        console.error(err)
      }
    })
  }
}
