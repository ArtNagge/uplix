import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import sendSocket from '../../utils/sendSocket'

class AuthPage extends PureComponent {
  render() {
    const { connect, ws, auth } = this.props

    if (connect) {
      const url = new URL(window.location.href)
      const requestCode = url.search.split('=')[1]
      const auth_data = { code: requestCode }
      sendSocket(ws, 3, { method: 'auth.init', parameters: { social: 'vkontakte', auth_data, dev: 1 } }, 'authData')
    }

    return auth ? <Redirect to="/" /> : <h1>Auth</h1>
  }
}

const mapStateToProps = ({
  user: {
    user: { auth },
  },
  socket: { ws, connect },
}) => {
  return { auth, ws, connect }
}

export default connect(mapStateToProps, {})(AuthPage)
