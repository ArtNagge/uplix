import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { routs } from '../../utils/config'
import { Sidebar } from '../../components/Sidebar'
import { Chat } from '../../components/Chat'
import { BrowserRouter as Router } from 'react-router-dom'
import { getUserInfo, logoutUser, authUser, getBalance } from '../../store/actions/userAction'
import { initChat, chat } from '../../store/actions/chatAction'
import { getJackpot, makeBet } from '../../store/actions/jackpotAction'
import { getLangResourse, getStorageResourse } from '../../store/actions/langAction'
import ReconnectingWebSocket from 'reconnecting-websocket'
import sendSocket from '../../utils/sendSocket'

import s from './styles.scss'

class App extends PureComponent {
  state = {
    socketAuth: false,
    subscribes: [],
    connect: 1,
    online: 0,
  }

  ws = new ReconnectingWebSocket('wss://uptest.work:2087/', null, { debug: false, reconnectInterval: 2000 })

  componentDidMount() {
    const {
      getLangResourse,
      getStorageResourse,
      authUser,
      getUserInfo,
      getJackpot,
      makeBet,
      getBalance,
      initChat,
      chat,
    } = this.props

    const lang_hash = localStorage.getItem('lang_hash')
    const lang_source = localStorage.getItem('lang_source')
    const access_token = localStorage.getItem('access_token')

    this.ws.onopen = () => {
      sendSocket(this.ws, 1, access_token || 1, 'getUser')
      sendSocket(this.ws, 3, { method: 'chat.history' }, 'chatHistory')
      sendSocket(this.ws, 2, this.state.subscribes)

      this.addSubscribe('online')

      this.setState({ socketAuth: true })
    }

    this.ws.onmessage = (data) => {
      const { data: response } = data
      const info = JSON.parse(response)
      // console.log(info)

      switch (info.seq || info.channel) {
        case 'online': {
          this.setState({ online: info.message })
        }
        case 'chatHistory': {
          this.addSubscribe('chat')
          return initChat(info)
        }
        case 'chat': {
          return chat(info.message)
        }
        case 'wheel': {
          return makeBet(info.message)
        }
        case 'authData': {
          authUser(info)
          return
        }
        case 'auth': {
          const { response, status } = info
          if (status === 'success') {
            window.open(response.redirect_url, '_parent')
          }
          return
        }
        case 'languageSources': {
          getLangResourse(info)
          return
        }
        case 'getUser': {
          if (!lang_hash || info.response.lang_hash !== lang_hash) {
            sendSocket(this.ws, 3, { method: 'language.getResource' }, 'languageSources')
            localStorage.setItem('lang_hash', info.lang_hash)
          } else {
            getStorageResourse(JSON.parse(lang_source))
          }

          if (access_token) {
            getUserInfo(info, access_token)
            this.addSubscribe('balance')
          }
          return
        }
        case 'bet': {
          return
        }
        case 'balance': {
          return getBalance(info.message)
        }
        case 'wheelGet': {
          this.addSubscribe('wheel')
          return getJackpot(info)
        }
      }
    }
  }

  handleConnect = () => {
    this.setState({ connect: 0 })
  }

  addSubscribe = (val, dell) => {
    const { subscribes } = this.state
    const indexElem = subscribes.findIndex((v) => v === val)

    if (indexElem < 0) {
      return this.setState({ subscribes: [...subscribes, val] }, () => sendSocket(this.ws, 2, this.state.subscribes))
    }

    if (indexElem >= 0 && dell) {
      return this.setState({ subscribes: [...subscribes.slice(0, indexElem), subscribes.slice(indexElem + 1)] }, () =>
        sendSocket(this.ws, 2, this.state.subscribes)
      )
    }
  }

  render() {
    const { socketAuth, connect, online } = this.state
    const { messages, user, logoutUser } = this.props
    return (
      <Router>
        <div className={s.content_wrapper}>
          <Sidebar ws={this.ws} user={user} logoutUser={() => logoutUser()} />
          <div className={s.content}>
            <Switch>
              {routs.map((el, index) => {
                const { component: Component, exact, path } = el
                return (
                  <Route
                    key={index}
                    exact={exact}
                    path={path}
                    component={() => (
                      <Component
                        connect={connect}
                        handleConnect={this.handleConnect}
                        wsConnect={socketAuth}
                        addSubscribe={this.addSubscribe}
                        ws={this.ws}
                      />
                    )}
                  />
                )
              })}
            </Switch>
          </div>
          <Chat online={online} ws={this.ws} user={user} messages={messages} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = ({ chat: messages, user }) => {
  return { messages, user }
}

export default connect(mapStateToProps, {
  getJackpot,
  logoutUser,
  getStorageResourse,
  getLangResourse,
  getUserInfo,
  authUser,
  makeBet,
  getBalance,
  initChat,
  chat,
})(App)
