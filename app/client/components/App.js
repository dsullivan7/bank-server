import React from 'react'
import { Button } from 'react-bootstrap'

export default class App extends React.Component {
  componentDidMount() {
    this.handleAuthentication()
  }

  login = () => this.props.auth.login()

  handleAuthentication = () => this.props.auth.handleAuthentication()

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Button bsStyle="primary" onClick={this.login}>
          Log In
        </Button>
      </div>
    )
  }
}
