import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import PaymentMethod from '../PaymentMethod'
import checkLang from '../../utils/checkLang'

import s from './styles.scss'

const Paymetns = () => {
  const [method, setMethod] = useState('')
  const { lang } = useSelector(({ lang: { data: lang } }) => ({ lang }))

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

  // "payments.history": "История платежей"

  return (
    <div className={s.profile_content_user}>
      <div className={s.profile_content_user_payments}>
        <h3>{checkLang(lang, 'withdraw')}</h3>
        <div className={s.profile_content_user_payments_methods}>
          {methods.map((m, index) => (
            <PaymentMethod onClick={handleMethod} key={index} info={m} active={method} />
          ))}
        </div>
        <div className={s.profile_content_user_payments_count}></div>
      </div>
    </div>
  )
}

export default Paymetns
