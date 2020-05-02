import React from 'react'
import { useSelector } from 'react-redux'

import checkLang from '../../utils/checkLang'
import MiniBlockInfo from '../MiniBlockInfo'
import AvatarElips from '../AvatarElips'
import HistoryProfile from '../HistoryProfile'

import s from './styles.scss'
import dayjs from 'dayjs'

const Profile = ({ guestId }) => {
  const { lang, user, history, gId, gName, gPicture } = useSelector(
    ({
      lang: { data: lang },
      user: {
        user,
        history,
        guests: { id: gId, name: gName, picture: gPicture },
      },
    }) => ({
      lang,
      user,
      history,
      gId,
      gName,
      gPicture,
    })
  )
  const { id, name, picture } = user

  return (
    <div className={s.profile_content_user}>
      <div className={s.profile_content_user_info}>
        {AvatarElips(guestId ? gPicture : picture, 210, 210)}
        <h4>{guestId ? gName : name}</h4>
        <span>ID: {guestId ? gId : id}</span>
      </div>
      {!guestId && (
        <>
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
              {history
                .filter((h) => h.action === 3)
                .map((h, index) => (
                  <HistoryProfile
                    key={index}
                    date={dayjs(h.time * 1000).format('DD.MM.YY в HH:mm')}
                    classes={s.profile_content_user_history_games_icon}
                    event={h.value}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Profile
