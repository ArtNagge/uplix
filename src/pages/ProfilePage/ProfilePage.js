import cn from 'classnames'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Payments from '../../components/Payments'
import Tasks from '../../components/Tasks'
import Profile from '../../components/Profile'
import checkLang from '../../utils/checkLang'

import s from './styles.scss'

const ProfilePage = () => {
  const [active, setActive] = useState('payments')
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
        return <Profile />
      case 'tasks':
        return <Tasks />
      case 'payments':
        return <Payments />
      case 'promo':
        return 'promo'
      default:
        return null
    }
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
