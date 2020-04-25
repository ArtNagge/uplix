import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import MiniBlockInfo from '../../components/MiniBlockInfo/MiniBlockInfo'
import { leaderboardAction } from '../../store/actions'
import checkLang from '../../utils/checkLang'

import s from './styles.scss'

import { ListLeaderboard } from '../../components/ListLeaderboard'

class JackpotPage extends PureComponent {
  componentDidMount() {
    const { getLeaderboard } = this.props

    leaderboardAction.getLeaderboard()
  }

  render() {
    const {
      leaderboard,
      user: {
        user: { id },
      },
      lang,
    } = this.props

    return (
      <div className={s.leaderboard_wrapper}>
        <h5 className={s.leaderboard_wrapper_heading}>{checkLang(lang, 'leaders')}</h5>
        <div className={s.leaderboard_wrapper_info}>
          <MiniBlockInfo icon="ruble" title={checkLang(lang, 'ref.earned')} description="1535460" />
          <MiniBlockInfo icon="place" title={checkLang(lang, 'player.place')} description="#2" />
          <MiniBlockInfo icon="invitee" title={checkLang(lang, 'ref.invited')} description="3542" />
        </div>
        <div className={s.leaderboard_wrapper_list}>
          <div className={s.leaderboard_wrapper_list_heading}>
            <span>{checkLang(lang, 'place')}</span>
            <span>{checkLang(lang, 'player')}</span>
            <span>{checkLang(lang, 'refs')}</span>
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

const mapStateToProps = ({ leaderboard, user, lang: { data: lang } }) => ({
  leaderboard,
  user,
  lang,
})

const mapDispatchToProps = (dispatch) => ({
  getLeaderboard: () => dispatch(getLeaderboard()),
})

export default connect(mapStateToProps, mapDispatchToProps)(JackpotPage)
