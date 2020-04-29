import cn from 'classnames'
import React from 'react'

import svgIcons from '../../utils/svgIcons'
import s from './styles.scss'
import SvgIcon from '../SvgIcon'

const HistoryProfile = ({ icon, classes, date, event }) => {
  const eventIsNumber = !isNaN(Number(event))
  const classesEvent = cn(
    eventIsNumber && s.hist_info_event_number,
    eventIsNumber && Number(event) < 0 ? s.hist_info_event_gray : eventIsNumber ? s.hist_info_event_purple : '',
    !eventIsNumber && s.hist_info_event_text
  )
  return (
    <div className={s.hist}>
      <div className={s.hist_icon}>
        <div className={classes}>{svgIcons[icon]}</div>
      </div>
      <div className={s.hist_info}>
        <div className={s.hist_info_container}>
          <span className={s.hist_info_date}>{date}</span>
          <span className={classesEvent}>
            {event}
            {eventIsNumber && <SvgIcon icon="gem" classes={s.hist_info_event_icon} />}
          </span>
        </div>
      </div>
    </div>
  )
}

HistoryProfile.defaultProps = {
  icon: 'jackpot',
  classes: '',
  date: '23.02.20 в 15:19',
  event: 'event',
}

export default HistoryProfile
