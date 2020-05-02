import cn from 'classnames'
import React from 'react'
import { useSelector } from 'react-redux'
import checkLang from '../../utils/checkLang'

import s from './styles.scss'
import SvgIcon from '../SvgIcon'

const HistoryProfile = ({ event, prize, progress, can_activate, onClick, guestId }) => {
  const { current, purpose } = progress
  const width = current >= purpose ? purpose : (current * 100) / purpose
  const { lang } = useSelector(({ lang: { data: lang } }) => ({ lang }))

  return (
    <div className={s.task}>
      <div className={s.task_main}>
        <span className={s.task_main_event}>{event}</span>
        <div className={s.task_main_progress}>
          <span>{`${current}/${purpose}`}</span>
          <div className={s.task_main_progress_current} style={{ width: `calc(${width}% - 8px)` }} />
        </div>
      </div>
      {!guestId && (
        <div className={s.task_control}>
          <div className={s.task_control_prize}>
            <span>
              {checkLang(lang, 'prize')} {prize}
            </span>
            <SvgIcon icon="gem" classes={s.task_control_prize_icon} />
          </div>
          {can_activate ? (
            <button onClick={onClick} className={cn(s.task_control_prize_button, s.task_control_prize_button_active)}>
              Забрать
            </button>
          ) : (
            <button onClick={onClick} className={s.task_control_prize_button}>
              Забрать
            </button>
          )}
        </div>
      )}
    </div>
  )
}

HistoryProfile.defaultProps = {
  event: 'Сыграть в режим “Классик” 5 раз',
  prize: 50,
  progress: { current: 1, purpose: 5 },
}

export default HistoryProfile
