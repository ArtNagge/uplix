import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import MiniBlockInfo from '../../components/MiniBlockInfo/MiniBlockInfo'
import { connectCounter } from '../../store/actions/socket'
import { appLoad } from '../../store/actions/appAction'
import checkLang from '../../utils/checkLang'
import sendSocket from '../../utils/sendSocket'

import s from './styles.scss'

import { ListLeaderboard } from '../../components/ListLeaderboard'

class JackpotPage extends PureComponent {
  componentDidMount() {
    const { ws, connect, countConnect, connectCounter } = this.props
    if (connect && countConnect) {
      connectCounter(0)
      sendSocket(ws, 3, { method: 'leaders.get' }, 'leaderboard')
    }
  }

  componentDidUpdate() {
    const { ws, connect, countConnect, connectCounter } = this.props
    if (connect && countConnect) {
      connectCounter(0)
      sendSocket(ws, 3, { method: 'leaders.get' }, 'leaderboard')
    }
  }

  componentWillUnmount() {
    const { appLoad, connectCounter } = this.props
    connectCounter(1)
    appLoad(true)
  }

  render() {
    const {
      leaderboard,
      user: {
        user: { id, top_place, income, invited },
      },
      lang,
    } = this.props

    return (
      <div className={s.leaderboard_wrapper}>
        <h5 className={s.leaderboard_wrapper_heading}>{checkLang(lang, 'leaders')}</h5>
        <div className={s.leaderboard_wrapper_info}>
          <MiniBlockInfo icon="ruble" title={checkLang(lang, 'invites.earned')} description={income} />
          <MiniBlockInfo icon="place" title={checkLang(lang, 'player_place')} description={`#${top_place || 0}`} />
          <MiniBlockInfo icon="invitee" title={checkLang(lang, 'invites.invited')} description={invited} />
        </div>
        <div className={s.leaderboard_wrapper_list}>
          <div className={s.leaderboard_wrapper_list_heading}>
            <span>{checkLang(lang, 'place')}</span>
            <span>{checkLang(lang, 'player')}</span>
            <span>{checkLang(lang, 'invites.name')}</span>
            <span>{checkLang(lang, 'income')}</span>
          </div>
          <div className={s.leaderboard_wrapper_list_container}>
            <ListLeaderboard leaderboard={leaderboard} userId={id} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ leaderboard, user, lang: { data: lang }, socket: { ws, connect, countConnect } }) => ({
  leaderboard,
  user,
  lang,
  ws,
  connect,
  countConnect,
})

export default connect(mapStateToProps, { appLoad, connectCounter })(JackpotPage)
