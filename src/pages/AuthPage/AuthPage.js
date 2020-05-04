import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { appLoad } from '../../store/actions/appAction'
import { connectCounter } from '../../store/actions/socket'
import { connect } from 'react-redux'
import sendSocket from '../../utils/sendSocket'

class AuthPage extends PureComponent {
  componentDidMount() {
    const { appLoad } = this.props
    appLoad(true)
  }
  componentWillUnmount() {
    const { connectCounter } = this.props

    connectCounter(1)
  }

  render() {
    const { connect, ws, auth, countConnect, connectCounter } = this.props

    if (connect && countConnect) {
      const url = new URL(window.location.href)
      const requestCode = url.search.split('=')[1]
      const auth_data = { code: requestCode }
      sendSocket(ws, 3, { method: 'auth.init', parameters: { social: 'vkontakte', auth_data } }, 'authData')
      connectCounter(0)
    }

    return auth ? <Redirect to="/" /> : <h1>Auth</h1>
  }
}

const mapStateToProps = ({
  user: {
    user: { auth },
  },
  socket: { ws, connect, countConnect },
}) => {
  return { auth, ws, connect, countConnect }
}

export default connect(mapStateToProps, { appLoad, connectCounter })(AuthPage)
