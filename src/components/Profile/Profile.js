import React from 'react'
import { useSelector } from 'react-redux'

import checkLang from '../../utils/checkLang'
import MiniBlockInfo from '../MiniBlockInfo'
import AvatarElips from '../AvatarElips'
import HistoryProfile from '../HistoryProfile'

import s from './styles.scss'

const Paymetns = () => {
  const { lang } = useSelector(({ lang: { data: lang } }) => ({ lang }))

  return (
    <div className={s.profile_content_user}>
      <div className={s.profile_content_user_info}>
        {AvatarElips('https://sun9-35.userapi.com/c851336/v851336611/1602c1/n9_P4A8hTxY.jpg', 210, 210)}
        <h4>Yan Grinberg</h4>
        <span>ID: 123124</span>
      </div>
      <div className={s.profile_content_user_main}>
        <MiniBlockInfo icon="ruble" title={checkLang(lang, 'ref.earned')} description="35460" />
        <MiniBlockInfo
          icon="copy"
          title={checkLang(lang, 'ref.link')}
          description="uplix.com/partner/454960"
          width={300}
          copy
        />
        <MiniBlockInfo icon="invitee" title={checkLang(lang, 'ref.invited')} description="3542" />
      </div>
      <div className={s.profile_content_user_history_games}>
        <h4>{checkLang(lang, 'game.history')}</h4>
        <div className={s.profile_content_user_history_games_container}>
          <HistoryProfile classes={s.profile_content_user_history_games_icon} />
          <HistoryProfile classes={s.profile_content_user_history_games_icon} />
          <HistoryProfile classes={s.profile_content_user_history_games_icon} event="400" />
          <HistoryProfile classes={s.profile_content_user_history_games_icon} event="-400" />
          <HistoryProfile classes={s.profile_content_user_history_games_icon} event="-400" />
          <HistoryProfile classes={s.profile_content_user_history_games_icon} event="-400" />
          <HistoryProfile classes={s.profile_content_user_history_games_icon} event="-400" />
        </div>
      </div>
    </div>
  )
}

export default Paymetns
