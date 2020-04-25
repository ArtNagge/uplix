import cn from 'classnames'
import React from 'react'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'

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
  prize: 500,
  full: 75,
  currentProgress: 30,
  title: 'Название достижения',
}

HistoryProfile.propTypes = {
  prize: PropTypes.number,
  classes: PropTypes.string,
  date: PropTypes.any,
  event: PropTypes.any,
}

export default HistoryProfile
