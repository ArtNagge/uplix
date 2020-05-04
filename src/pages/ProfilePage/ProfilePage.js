import cn from 'classnames'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Payments from '../../components/Payments'
import Tasks from '../../components/Tasks'
import Profile from '../../components/Profile'
import checkLang from '../../utils/checkLang'
import sendSocket from '../../utils/sendSocket'
import { connectCounter } from '../../store/actions/socket'
import { appLoad } from '../../store/actions/appAction'

import s from './styles.scss'
import Promo from '../../components/Promo'

const ProfilePage = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch()
  const [active, setActive] = useState('profile')
  const { lang, ws, connect, countConnect } = useSelector(
    ({ lang: { data: lang }, socket: { ws, connect, countConnect } }) => ({
      lang,
      ws,
      connect,
      countConnect,
    })
  )

  useEffect(() => {
    if (connect && countConnect) {
      dispatch(connectCounter(0))
      if (id) {
        sendSocket(ws, 3, { method: 'users.getById', parameters: { user_id: id } }, 'usersGetById')
        sendSocket(ws, 3, { method: 'payments.history', parameters: { action: 3, user_id: id } }, 'guestsHistory')
        sendSocket(ws, 3, { method: 'tasks.get', parameters: { user_id: id } }, 'tasksGetId')
      } else {
        sendSocket(ws, 3, { method: 'payments.history', parameters: { action: 3 } }, 'gameHistory')
        sendSocket(ws, 3, { method: 'payments.history', parameters: { action: 2 } }, 'paymentsHistory')
        sendSocket(ws, 3, { method: 'tasks.get' }, 'tasksGet')
      }
    }
  }, [connect, countConnect])

  useEffect(() => {
    dispatch(appLoad(true))
    if (id && connect) {
      sendSocket(ws, 3, { method: 'users.getById', parameters: { user_id: id } }, 'usersGetById')
      sendSocket(ws, 3, { method: 'payments.history', parameters: { action: 3, user_id: id } }, 'guestsHistory')
      sendSocket(ws, 3, { method: 'tasks.get', parameters: { user_id: id } }, 'tasksGetId')
    }
  }, [id])

  useEffect(() => {
    return () => {
      dispatch(connectCounter(1))
      dispatch(appLoad(true))
    }
  }, [])

  const tabs = !id
    ? [
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
    : [
        {
          name: checkLang(lang, 'profile'),
          value: 'profile',
        },
        {
          name: checkLang(lang, 'tasks'),
          value: 'tasks',
        },
      ]

  const handleChange = (value) => setActive(value)

  const selectContent = () => {
    switch (active) {
      case 'profile':
        return <Profile guestId={id} />
      case 'tasks':
        return <Tasks guestId={id} />
      case 'payments':
        return <Payments />
      case 'promo':
        return <Promo />
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
