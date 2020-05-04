import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'

import PaymentMethod from '../PaymentMethod'
import checkLang from '../../utils/checkLang'
import sendSocket from '../../utils/sendSocket'
import HistoryProfile from '../HistoryProfile'
import InputMask from 'react-input-mask'

import s from './styles.scss'

const Paymetns = () => {
  const [method, setMethod] = useState('')
  const [wallet, setWallet] = useState('')
  const [count, setCount] = useState('')
  const { lang, ws, payments } = useSelector(({ lang: { data: lang }, socket: { ws }, user: { payments } }) => ({
    lang,
    ws,
    payments,
  }))

  const methods = [
    {
      name: checkLang(lang, 'payments.qiwi'),
      value: 'qiwi',
    },
    {
      name: checkLang(lang, 'payments.yandex'),
      value: 'ym',
    },
    {
      name: checkLang(lang, 'payments.card'),
      value: 'card',
    },
  ]

  const handleMethod = (evt) => {
    const {
      dataset: { value },
    } = evt.currentTarget
    setMethod(value)
  }

  const handleCount = (evt) => {
    setCount(evt.target.value.replace(/\D/, ''))
  }

  const handleWallet = (evt) => {
    setWallet(evt.target.value.replace(/\D/, ''))
  }

  const selectMask = () => {
    switch (method) {
      case 'qiwi': {
        return '+7 (999) 999-99-99'
      }
      case 'ym': {
        return '410099999999999'
      }
      case 'card': {
        return '9999 9999 9999 9999'
      }
      default:
        return '+7 (999) 999-99-99'
    }
  }

  const handleClick = (evt) => {
    evt.preventDefault()

    sendSocket(
      ws,
      3,
      { method: 'payments.withdrawal', parameters: { payment_system: method, amount: count, wallet } },
      'withdrawal'
    )
    setCount('')
  }

  return (
    <div className={s.profile_content_user}>
      <div className={s.profile_content_user_payments}>
        <h3>{checkLang(lang, 'withdraw')}</h3>
        <div className={s.profile_content_user_payments_methods}>
          {methods.map((m, index) => (
            <PaymentMethod onClick={handleMethod} key={index} info={m} active={method} />
          ))}
        </div>
        <InputMask
          className={s.profile_content_user_payments_number}
          placeholder={checkLang(lang, 'input.number')}
          type="text"
          onChange={handleWallet}
          value={wallet}
          mask={selectMask()}
          maskChar="_"
        />
        <div className={s.profile_content_user_payments_count}>
          <input placeholder={checkLang(lang, 'input.amount')} type="text" onChange={handleCount} value={count} />
          <button onClick={handleClick}>{checkLang(lang, 'receive.money')}</button>
        </div>
        <div className={s.profile_content_user_payments_list}>
          <h4>{checkLang(lang, 'payments.history')}</h4>
          <div className={s.profile_content_user_payments_list_container}>
            {payments.map((h, index) => (
              <HistoryProfile
                key={index}
                date={dayjs(h.time * 1000).format('DD.MM.YY в HH:mm')}
                classes={s.profile_content_user_payments_list_icon}
                event={h.value}
                icon="gem"
                string
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Paymetns
