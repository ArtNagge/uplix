import cn from 'classnames'
import React from 'react'

import formatFN from '../../utils/formatFN'
import s from './styles.scss'

const ListLeaderboard = ({ leaderboard, userId }) => {
  return leaderboard.map((l, index) => (
    <div className={cn(s.leaderboard_user, l.userId === userId && s.leaderboard_user_active)} key={index}>
      <div className={s.leaderboard_user_place}>
        <div className={s.leaderboard_user_place_pl}>
          <span>{index + 1}</span>
        </div>
      </div>
      <div className={s.leaderboard_user_gamer}>
        <div className={s.leaderboard_user_gamer_img}>
          <img src={l.avatar} alt="" />
        </div>
        <span>{formatFN(l.name)}</span>
      </div>
      <div className={s.leaderboard_user_refs}>
        <span>{l.refs}</span>
      </div>
      <div className={s.leaderboard_user_income}>
        <span>{l.income}</span>
      </div>
    </div>
  ))
}

export default ListLeaderboard
