import cn from 'classnames'
import React from 'react'

import formatFN from '../../utils/formatFN'
import s from './styles.scss'

const ListLeaderboard = ({ leaderboard, userId }) => {
  return Object.keys(leaderboard).map((l, index) => (
    <div className={cn(s.leaderboard_user, leaderboard[l].user_id === userId && s.leaderboard_user_active)} key={index}>
      <div className={s.leaderboard_user_place}>
        <div className={s.leaderboard_user_place_pl}>
          <span>{index + 1}</span>
        </div>
      </div>
      <div className={s.leaderboard_user_gamer}>
        <div className={s.leaderboard_user_gamer_img}>
          <img src={leaderboard[l].picture} alt="" />
        </div>
        <span>{formatFN(leaderboard[l].name)}</span>
      </div>
      <div className={s.leaderboard_user_refs}>
        <span>{leaderboard[l].invited}</span>
      </div>
      <div className={s.leaderboard_user_income}>
        <span>{leaderboard[l].amount}</span>
      </div>
    </div>
  ))
}

export default ListLeaderboard
