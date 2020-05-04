import React, { useState } from 'react'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'

import checkLang from '../../utils/checkLang'
import clearMethod from '../../utils/clearMethod'
import HistoryProfile from '../HistoryProfile'
import sendSocket from '../../utils/sendSocket'

import s from './styles.scss'
import SvgIcon from '../SvgIcon'

const Promo = () => {
  const { lang, payments } = useSelector(({ lang: { data: lang }, user: { payments } }) => ({ lang, payments }))
  const [promo, setPromo] = useState('')

  const pickUp = () => {
    console.log(promo)
    // sendSocket(ws, 3, { method: 'tasks.ID', parameters: { task } }, 'tasksPickUp')
  }

  const handlePromo = (evt) => {
    setPromo(evt.target.value.toUpperCase())
  }

  return (
    <div className={s.profile_content_user}>
      <div className={s.profile_content_user_promo}>
        <h3>{checkLang(lang, 'bonuses')}</h3>
        <div className={s.profile_content_user_promo_panel}>
          <div className={s.profile_content_user_promo_panel_spec}>
            <SvgIcon icon="logo" classes={s.profile_content_user_promo_panel_spec_logo} />
            <h1>{checkLang(lang, 'promocode.special')}</h1>
            <p dangerouslySetInnerHTML={{ __html: clearMethod(checkLang(lang, 'offer.info')) }} />
            <div className={s.profile_content_user_promo_panel_spec_info}>
              <span>
                {checkLang(lang, 'promocode.week')} <b>HAPPY2020</b>
              </span>
              <span>
                {checkLang(lang, 'promocode.bonus')} <b>2020</b>
              </span>
            </div>
          </div>
          <div className={s.profile_content_user_promo_panel_get}>
            <span className={s.profile_content_user_promo_panel_get_heading}>
              {checkLang(lang, 'promocode.activation')}
            </span>
            <input type="text" onChange={handlePromo} placeholder="PROMO" value={promo} />
            <button onClick={pickUp}>{checkLang(lang, 'activation')}</button>
          </div>
        </div>
        <div className={s.profile_content_user_promo_list}>
          <h4>{checkLang(lang, 'activation.history')}</h4>
          <div className={s.profile_content_user_promo_list_container}>
            {payments.map((h, index) => (
              <HistoryProfile
                key={index}
                date={dayjs(h.time * 1000).format('DD.MM.YY в HH:mm')}
                classes={s.profile_content_user_promo_list_icon}
                event={h.value}
                icon="promo"
                string
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Promo
