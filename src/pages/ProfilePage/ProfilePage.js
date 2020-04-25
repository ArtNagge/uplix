import cn from 'classnames'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { AvatarElips } from '../../components/AvatarElips'

import s from './styles.scss'
import MiniBlockInfo from '../../components/MiniBlockInfo/MiniBlockInfo'
import checkLang from '../../utils/checkLang'
import HistoryProfile from '../../components/HistoryProfile'
import TaskItem from '../../components/TaskItem'

const ProfilePage = () => {
  const [active, setActive] = useState('profile')
  const { lang } = useSelector(({ lang: { data: lang } }) => ({ lang }))

  const tabs = [
    {
      name: checkLang(lang, 'profile'),
      value: 'profile',
    },
    {
      name: checkLang(lang, 'tasks'),
      value: 'tasks',
    },
    {
      name: checkLang(lang, 'payments'),
      value: 'payments',
    },
    {
      name: checkLang(lang, 'promocodes'),
      value: 'promo',
    },
  ]

  const handleChange = (value) => setActive(value)

  const selectContent = () => {
    switch (active) {
      case 'profile':
        return profile()
      case 'tasks':
        return tasks()
      case 'payments':
        return 'payments'
      case 'promo':
        return 'promo'
      default:
        return null
    }
  }

  const tasks = () => {
    return (
      <div className={s.profile_content_user}>
        <div className={s.profile_content_user_tasks}>
          <h3>{checkLang(lang, 'day.tasks')}</h3>
          <div className={s.profile_content_user_tasks_info}>
            <MiniBlockInfo width={200} title={checkLang(lang, 'time.left')} description="13:20:20" />
          </div>
          <div className={s.profile_content_user_tasks_list}>
            <TaskItem />
          </div>
        </div>
      </div>
    )
  }

  const profile = () => {
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
          <HistoryProfile classes={s.profile_content_user_history_games_icon} />
          <HistoryProfile classes={s.profile_content_user_history_games_icon} />
          <HistoryProfile classes={s.profile_content_user_history_games_icon} event="400" />
          <HistoryProfile classes={s.profile_content_user_history_games_icon} event="-400" />
          <HistoryProfile classes={s.profile_content_user_history_games_icon} event="-400" />
          <HistoryProfile classes={s.profile_content_user_history_games_icon} event="-400" />
          <HistoryProfile classes={s.profile_content_user_history_games_icon} event="-400" />
        </div>
      </div>
    )
  }

  return (
    <div className={s.profile}>
      <div className={s.profile_tabs}>
        {tabs.map((tab, idx) => (
          <button
            className={cn(s.profile_tab, tab.value === active && s.profile_tab_active)}
            onClick={() => handleChange(tab.value)}
            key={`tab_${idx}`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className={s.profile_content}>{selectContent()}</div>
    </div>
  )
}

export default ProfilePage
