import cn from 'classnames'
import { connect } from 'react-redux'
import Jackpot from '../../components/Jackpot/Jackpot'
import { connectCounter } from '../../store/actions/socket'
import React, { PureComponent, createRef } from 'react'
import sendSocket from '../../utils/sendSocket'

import s from './styles.scss'
import SvgIcon from '../../components/SvgIcon'
import checkLang from '../../utils/checkLang'

class JackpotPage extends PureComponent {
  betRef = createRef()

  state = {
    bet: 0,
  }

  componentDidMount() {
    const { ws, connect, countConnect, connectCounter } = this.props
    if (connect && countConnect) {
      connectCounter(0)
      sendSocket(ws, 3, { method: 'wheel.get' }, 'wheelGet')
    }
  }

  componentDidUpdate() {
    const { ws, connect, countConnect, connectCounter } = this.props
    if (connect && countConnect) {
      connectCounter(0)
      sendSocket(ws, 3, { method: 'wheel.get' }, 'wheelGet')
    }
  }

  componentWillUnmount() {
    const { connectCounter } = this.props
    connectCounter(1)
  }

  handleBet = (evt) => {
    const { value } = evt.target
    const target = this.betRef.current
    const res = String(Number(value.replace(/\D/, '')))
    target.size = (!res.length && 1) || (res.length >= 5 && 5) || res.length
    this.setState({ bet: res })
  }

  handleBetAndSizeInput = (result) => {
    const target = this.betRef.current
    const res = String(Number(result))
    target.size = (!res.length && 1) || (res.length >= 5 && 5) || res.length
    this.setState({ bet: res })
  }

  handleAddBalance = (type, value) => {
    const { bet } = this.state
    const { balance } = this.props.user

    switch (type) {
      case 'ADD':
        return this.handleBetAndSizeInput(Number(bet) + value)
      case 'DIVIDE':
        return this.handleBetAndSizeInput(Number(bet) / value)
      case 'MULTIPLY':
        return this.handleBetAndSizeInput(Number(bet) * value)
      case 'MAX':
        return this.handleBetAndSizeInput(balance)
      default:
        return null
    }
  }

  makeBet = (color) => {
    const { bet } = this.state
    const { ws, user } = this.props
    const { balance } = user

    if (bet && bet <= balance) {
      this.setState({ bet: 0 })
      switch (color) {
        case 'PINK':
          return sendSocket(ws, 3, { method: 'wheel.bet', parameters: { color: 'pink', amount: bet } }, 'bet')
        case 'PURPLE':
          return sendSocket(ws, 3, { method: 'wheel.bet', parameters: { color: 'purple', amount: bet } }, 'bet')
        default:
          return null
      }
    }
  }

  get betsList() {
    const { lang, bets, odds } = this.props
    const { purple, pink } = bets

    return (
      <div className={s.jackpot_bets}>
        <div className={cn(s.jackpot_bet, s.jackpot_bet_pink)}>
          <div className={s.jackpot_bet_color} />
          <div className={s.jackpot_bet_header}>
            {checkLang(lang, 'coefficient').toUpperCase()} <b>Х{odds.pink.toFixed(2)}</b>
          </div>
          <div className={s.jackpot_bet_container}>
            <div className={s.jackpot_bet_container_header}>
              <div className={s.jackpot_bet_name}>{checkLang(lang, 'join.players')}</div>
              <div className={s.jackpot_bet_amount}>{checkLang(lang, 'game.bets')}</div>
            </div>
            <div className={s.jackpot_bet_container_content}>
              {pink
                .sort((a, b) => b.bets - a.bets)
                .map(({ user, bets }, index) => (
                  <div className={s.jackpot_bet_container_bet} key={index}>
                    <div className={s.jackpot_bet_name}>
                      <div className={s.jackpot_bet_name_img}>
                        <img src={user.picture} alt="" />
                      </div>
                      {user.name}
                    </div>
                    <div className={s.jackpot_bet_amount}>{bets}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className={cn(s.jackpot_bet, s.jackpot_bet_purple)}>
          <div className={s.jackpot_bet_color} />
          <div className={s.jackpot_bet_header}>
            {checkLang(lang, 'coefficient').toUpperCase()} <b>Х{odds.purple.toFixed(2)}</b>
          </div>
          <div className={s.jackpot_bet_container}>
            <div className={s.jackpot_bet_container_header}>
              <div className={s.jackpot_bet_name}>{checkLang(lang, 'join.players')}</div>
              <div className={s.jackpot_bet_amount}>{checkLang(lang, 'game.bets')}</div>
            </div>
            <div className={s.jackpot_bet_container_content}>
              {purple
                .sort((a, b) => b.bets - a.bets)
                .map(({ user, bets }, index) => (
                  <div className={s.jackpot_bet_container_bet} key={index}>
                    <div className={s.jackpot_bet_name}>
                      <div className={s.jackpot_bet_name_img}>
                        <img src={user.picture} alt="" />
                      </div>
                      {user.name}
                    </div>
                    <div className={s.jackpot_bet_amount}>{bets}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  get control() {
    const { lang } = this.props
    const { bet } = this.state
    return (
      <div className={s.jackpot_control}>
        <div className={s.jackpot_control_amount}>
          <button
            onClick={() => this.makeBet('PINK')}
            className={cn(s.jackpot_control_bet, s.jackpot_control_bet_pink)}
          >
            <span>{checkLang(lang, 'place.bet')}</span>
          </button>
          <div className={s.jackpot_control_amount_field}>
            <input ref={this.betRef} type="text" size="1" value={bet} placeholder={0} onChange={this.handleBet} />
          </div>
          <button
            onClick={() => this.makeBet('PURPLE')}
            className={cn(s.jackpot_control_bet, s.jackpot_control_bet_purple)}
          >
            <span>{checkLang(lang, 'place.bet')}</span>
          </button>
        </div>
        <div className={s.jackpot_control_panel}>
          <button onClick={() => this.handleAddBalance('ADD', 1)}>
            <span>+1</span>
          </button>
          <button onClick={() => this.handleAddBalance('ADD', 5)}>
            <span>+5</span>
          </button>
          <button onClick={() => this.handleAddBalance('ADD', 10)}>
            <span>+10</span>
          </button>
          <button onClick={() => this.handleAddBalance('ADD', 100)}>
            <span>+100</span>
          </button>
          <button onClick={() => this.handleAddBalance('ADD', 500)}>
            <span>+500</span>
          </button>
          <button onClick={() => this.handleAddBalance('DIVIDE', 2)}>
            <span>1/2</span>
          </button>
          <button onClick={() => this.handleAddBalance('MULTIPLY', 2)}>
            <span>x2</span>
          </button>
          <button onClick={() => this.handleAddBalance('MAX')}>
            <span>{checkLang(lang, 'max.bet')}</span>
          </button>
        </div>
      </div>
    )
  }

  render() {
    const { bets, lang, history, result, topDay, time, start } = this.props
    const { purple, pink } = bets

    const pinkTotal = Math.round(pink.reduce((a, { bets }) => a + Number(bets), 0))
    const purpleTotal = Math.round(purple.reduce((a, { bets }) => a + Number(bets), 0).toFixed(1))
    const total = Number(pinkTotal) + Number(purpleTotal)
    const percent = (Math.floor(purpleTotal) / (Math.floor(purpleTotal) + Math.floor(pinkTotal))) * 100 || 0

    return (
      <>
        <div className={s.jackpot_wrapper}>
          <div className={s.jackpot_leftBlock}>
            <div className={s.jackpot_leftBlock_top}>
              <div className={cn(s.header_top, s.header_left)}>
                <span>{checkLang(lang, 'history')}</span>
              </div>
              <div className={s.content}>
                {history.map((h, index) => (
                  <div key={index} className={s[h]} />
                ))}
              </div>
            </div>
            <div className={s.jackpot_leftBlock_bottom}>
              <div className={cn(s.header_bottom, s.header_left, s.header_pink)}>
                <span>{checkLang(lang, 'game.total')}</span>
              </div>
              <div className={s.content}>
                <div className={s.content_users}>
                  <SvgIcon classes={s.content_users_icon} icon="user" />
                  {pink.length}
                </div>
                <div className={s.content_gems}>
                  <SvgIcon classes={s.content_gems_icon} icon="gem" />
                  {pinkTotal}
                </div>
              </div>
            </div>
          </div>
          <Jackpot total={total} time={time} start={start} percent={percent} result={result} />
          <div className={s.jackpot_rightBlock}>
            <div className={s.jackpot_rightBlock_top}>
              <div className={cn(s.header_top, s.header_right)}>
                <span>{checkLang(lang, 'day.top')}</span>
              </div>
              <div className={s.content}>
                <div className={s.jackpot_top_avatar}>
                  <div className={s.jackpot_top_avatarElips}>
                    <img src={topDay.avatar} alt="" />
                  </div>
                </div>
                <div className={s.jackpot_top_info}>
                  <span className={s.jackpot_top_info_name}>{topDay.name}</span>
                  <div className={s.jackpot_top_info_win}>
                    {topDay.win} <SvgIcon classes={s.jackpot_top_info_win_icon} icon="gem" />
                  </div>
                </div>
              </div>
            </div>
            <div className={s.jackpot_rightBlock_bottom}>
              <div className={cn(s.header_bottom, s.header_right, s.header_purple)}>
                <span>{checkLang(lang, 'game.total')}</span>
              </div>
              <div className={s.content}>
                <div className={s.content_users}>
                  <SvgIcon icon="user" classes={s.content_users_icon} />
                  {purple.length}
                </div>
                <div className={s.content_gems}>
                  <SvgIcon classes={s.content_gems_icon} icon="gem" />
                  {purpleTotal}
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.control}
        {this.betsList}
      </>
    )
  }
}

const mapStateToProps = ({
  jackpot: {
    bets,
    history,
    topDay,
    result,
    odds,
    timer: { time, start },
  },
  user: { user },
  lang: { data: lang },
  socket: { ws, connect, countConnect },
}) => {
  return { ws, connect, countConnect, bets, history, topDay, user, result, lang, odds, time, start }
}

export default connect(mapStateToProps, { connectCounter })(JackpotPage)
