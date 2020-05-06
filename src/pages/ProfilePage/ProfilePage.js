import cn from 'classnames'
import React, { useState, useEffect, useRef } from 'react'
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

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const ProfilePage = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch()
  const [active, setActive] = useState('profile')
  const { lang, ws, connect, countConnect, subscribe } = useSelector(
    ({ lang: { data: lang }, socket: { ws, connect, countConnect, subscribe } }) => ({
      lang,
      ws,
      subscribe,
      connect,
      countConnect,
    })
  )
  const prevId = id && usePrevious(id)

  useEffect(() => {
    if (connect && countConnect) {
      dispatch(connectCounter(0))
      if (id) {
        sendSocket(ws, 3, { method: 'users.getById', parameters: { user_id: id } }, 'usersGetById')
        sendSocket(ws, 3, { method: 'payments.history', parameters: { action: 3, user_id: id } }, 'guestsHistory')
        sendSocket(ws, 3, { method: 'tasks.get', parameters: { user_id: id } }, 'tasksGetId')
        subscribe(`payments_${id}`)
      } else {
        sendSocket(ws, 3, { method: 'payments.history', parameters: { action: 3 } }, 'gameHistory')
        sendSocket(ws, 3, { method: 'payments.history', parameters: { action: 2 } }, 'paymentsHistory')
        sendSocket(ws, 3, { method: 'tasks.get' }, 'tasksGet')
        subscribe(`payments`)
      }
    }
  }, [connect, countConnect])

  useEffect(() => {
    dispatch(appLoad(true))
    const fetch = async () => {
      if (id && connect) {
        await subscribe(`payments_${prevId}`, true)
        await sendSocket(ws, 3, { method: 'users.getById', parameters: { user_id: id } }, 'usersGetById')
        await sendSocket(ws, 3, { method: 'payments.history', parameters: { action: 3, user_id: id } }, 'guestsHistory')
        await sendSocket(ws, 3, { method: 'tasks.get', parameters: { user_id: id } }, 'tasksGetId')
        subscribe(`payments_${id}`)
      }
    }
    fetch()

    return () => {
      const descr = async () => {
        if (connect) {
          await subscribe(`payments_${id}`, true)
          await subscribe(`payments_${prevId}`, true)
          await subscribe(`payments`, true)
        }
      }
      descr()
      dispatch(connectCounter(1))
      dispatch(appLoad(true))
    }
  }, [id])

  const tabs = !id
    ? [
        {
          name: checkLang(lang, 'profile'),
          value: 'profile',
        },
        {
          name: checkLang(lang, 'tasks.name'),
          value: 'tasks',
        },
        {
          name: checkLang(lang, 'payments.name'),
          value: 'payments',
        },
        {
          name: checkLang(lang, 'promocodes.name'),
          value: 'promo',
        },
      ]
    : [
        {
          name: checkLang(lang, 'profile'),
          value: 'profile',
        },
        {
          name: checkLang(lang, 'tasks.name'),
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
