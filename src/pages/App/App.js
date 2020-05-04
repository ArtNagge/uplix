import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { routs } from '../../utils/config'
import { Sidebar } from '../../components/Sidebar'
import { Chat } from '../../components/Chat'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  getUserInfo,
  logoutUser,
  authUser,
  getBalance,
  gameHistory,
  paymentsHistory,
  guestsHistory,
  allTasks,
  guestsInfo,
  guestsTasks,
  withdrawal,
} from '../../store/actions/userAction'
import { initChat, chat, timerInit } from '../../store/actions/chatAction'
import { getJackpot, makeBet, clientServerDiff } from '../../store/actions/jackpotAction'
import { getLangResourse, getStorageResourse } from '../../store/actions/langAction'
import { socketConnect } from '../../store/actions/socket'
import { appLoad } from '../../store/actions/appAction'
import ReconnectingWebSocket from 'reconnecting-websocket'
import Notifications from '../../components/Notifications'
import { toast } from 'react-toastify'
import sendSocket from '../../utils/sendSocket'
import Media from 'react-media'

import s from './styles.scss'
import dayjs from 'dayjs'
import HeaderMobile from '../../components/HeaderMobile'
import ErrorBoundary from '../../components/ErrorBoundary'

import Loader from '../../components/Loader'
import Modal from '../../components/Modal'

class App extends PureComponent {
  state = {
    socketAuth: false,
    subscribes: [],
    connect: 1,
    tPing: 0,
    activeChat: false,
    activeMenu: false,
    modals: {
      balance: false,
      exit: false,
    },
    deposit: null,
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
      socketConnect,
      timerInit,
      clientServerDiff,
      gameHistory,
      paymentsHistory,
      allTasks,
      guestsHistory,
      appLoad,
      guestsInfo,
      guestsTasks,
      withdrawal,
    } = this.props

    const lang_hash = localStorage.getItem('lang_hash')
    const lang_source = localStorage.getItem('lang_source')
    const access_token = localStorage.getItem('access_token')

    this.ws.onopen = () => {
      sendSocket(this.ws, 1, access_token || 1, 'getUser')
      this.setState(
        { tPing: dayjs().valueOf() },
        sendSocket(this.ws, 3, { method: 'utils.getServerTime' }, 'getServerTime')
      )
      sendSocket(this.ws, 3, { method: 'chat.history' }, 'chatHistory')
      sendSocket(this.ws, 2, this.state.subscribes)

      this.addSubscribe('online')

      socketConnect(this.ws, true)
    }

    this.ws.onmessage = (data) => {
      const { data: response } = data
      const info = JSON.parse(response)
      console.log(info)

      switch (info.seq || info.channel) {
        case 'tasksPickUp': {
          // TODO: pick up
          break
        }
        case 'withdrawal': {
          // TODO: channels
          toast(info.response)
          withdrawal(info)
          break
        }
        case 'tasksGetId': {
          guestsTasks(info.response)
          break
        }
        case 'usersGetById': {
          guestsInfo(info.response)
          break
        }
        case 'guestsHistory': {
          guestsHistory(info.response)
          appLoad(false)
          break
        }
        case 'tasksGet': {
          allTasks(info.response)
          appLoad(false)
          break
        }
        case 'gameHistory': {
          gameHistory(info.response)
          appLoad(false)
          break
        }
        case 'paymentsHistory': {
          paymentsHistory(info.status === 'success' ? info.response : [])
          break
        }
        case 'getServerTime': {
          const { tPing } = this.state
          const tServ = dayjs(info.response * 1000).valueOf()
          const tPong = dayjs().valueOf()
          const tPP = tPing - tPong
          const tDiff = tServ - tPong - tPP
          clientServerDiff(tDiff)
          break
        }
        case 'online': {
          timerInit(info.message)
          break
        }
        case 'chatHistory': {
          this.addSubscribe('chat')
          initChat(info)
          break
        }
        case 'chat': {
          chat(info.message)
          break
        }
        case 'wheel': {
          makeBet(info.message)
          break
        }
        case 'authData': {
          authUser(info)
          sendSocket(this.ws, 1, info.response.access_token, 'getUser')
          break
        }
        case 'auth': {
          const { response, status } = info
          if (status === 'success') {
            window.open(response.redirect_url, '_parent')
          }
          break
        }
        case 'languageSources': {
          getLangResourse(info)
          break
        }
        case 'getUser': {
          if (!lang_hash || info.response.lang_hash !== lang_hash) {
            sendSocket(this.ws, 3, { method: 'language.getResource' }, 'languageSources')
            localStorage.setItem('lang_hash', info.response.lang_hash)
          } else {
            getStorageResourse(JSON.parse(lang_source))
          }

          if (access_token) {
            getUserInfo(info, access_token)
            this.addSubscribe('balance')
          }
          break
        }
        case 'bet': {
          toast(info.response)
          break
        }
        case 'balance': {
          getBalance(info.message)
          break
        }
        case 'wheelGet': {
          this.addSubscribe('wheel')
          getJackpot(info)
          appLoad(false)
          break
        }
      }
    }
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

  handleInvisible = (evt) => {
    const {
      dataset: { value },
    } = evt.currentTarget

    this.setState((state) => ({ ...state, activeChat: false, activeMenu: false, [value]: !state[value] }))
  }

  closeMenu = () => {
    this.setState({ activeMenu: false })
  }

  handleModal = (current) => {
    this.setState((state) => ({
      modals: {
        ...state.modals,
        [current]: !state.modals[current],
      },
    }))
  }

  handleDeposit = (evt) => {
    this.setState({ deposit: evt.target.value.replace(/\D/, '') })
  }

  render() {
    const {
      activeMenu,
      activeChat,
      modals: { balance, exit },
      deposit,
    } = this.state
    const { online, messages, user, logoutUser } = this.props
    const Input = (
      <input
        className={s.depositInput}
        type="text"
        onChange={this.handleDeposit}
        value={deposit || ''}
        placeholder="Ведите кол-во гемов"
      />
    )

    return (
      <Router>
        <Loader>
          <div className={s.content_wrapper}>
            <Sidebar
              onClick={this.closeMenu}
              activeMenu={activeMenu}
              ws={this.ws}
              user={user}
              handleModal={this.handleModal}
            />
            <div className={s.content}>
              <Notifications />
              <Media query={{ maxWidth: 1280 }}>
                {(match) =>
                  match ? (
                    <HeaderMobile
                      handleInvisible={this.handleInvisible}
                      activeMenu={activeMenu}
                      activeChat={activeChat}
                      handleModal={this.handleModal}
                    />
                  ) : null
                }
              </Media>
              <Switch>
                <ErrorBoundary>
                  {routs.map((el, index) => (
                    <Route key={index} exact={el.exact} path={el.path} component={el.component} />
                  ))}
                </ErrorBoundary>
              </Switch>
            </div>
            <Chat activeChat={activeChat} online={online} ws={this.ws} user={user} messages={messages} />
          </div>
          {ReactDOM.createPortal(
            <>
              <Modal
                header="Пополнение баланса"
                successButton="Продолжить"
                current="balance"
                active={balance}
                moreElements={Input}
                handleSuccess={() => alert('нахуй пошел')}
                mainHeader="Сумма пополнения"
                description={'*Пополнение баланса осуществляется\nавтоматически. По всем вопросам - поддержка'}
                handleVisible={this.handleModal}
              />
              <Modal
                header="Выход"
                successButton="Выход"
                current="exit"
                active={exit}
                handleSuccess={() => logoutUser()}
                mainHeader="Вы точно хотите выйти?"
                handleVisible={this.handleModal}
              />
            </>,
            document.getElementById('modals')
          )}
        </Loader>
      </Router>
    )
  }
}

const mapStateToProps = ({ chat: { messages, online }, user, socket: { ws } }) => {
  return { messages, online, user, ws }
}

export default connect(mapStateToProps, {
  chat,
  makeBet,
  initChat,
  authUser,
  timerInit,
  getBalance,
  logoutUser,
  getJackpot,
  getUserInfo,
  socketConnect,
  getLangResourse,
  getStorageResourse,
  clientServerDiff,
  gameHistory,
  paymentsHistory,
  guestsHistory,
  allTasks,
  appLoad,
  guestsInfo,
  guestsTasks,
  withdrawal,
})(App)
