import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import sendSocket from '../../utils/sendSocket'

class AuthPage extends PureComponent {
  render() {
    const { wsConnect, ws, auth } = this.props

    if (wsConnect) {
      const url = new URL(window.location.href)
      const requestCode = url.search.split('=')[1]
      const auth_data = { code: requestCode }
      sendSocket(ws, 3, { method: 'auth.init', parameters: { social: 'vkontakte', auth_data } }, 'authData')
    }

    return auth ? <Redirect to="/" /> : <h1>Auth</h1>
  }
}

const mapStateToProps = ({
  user: {
    user: { auth },
  },
}) => {
  return { auth }
}

export default connect(mapStateToProps, {})(AuthPage)
