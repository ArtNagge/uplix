import cn from 'classnames'
import dayjs from 'dayjs'
import React from 'react'

import SvgIcon from '../SvgIcon'
import s from './styles.scss'

const HistoryList = ({ header, histList, balance, text }) => {
  const stylesEvent = cn(
    s.history_item_info_event,
    balance && s.history_item_info_event_balance,
    text && s.history_item_info_event_text
  )
  return (
    <div className={s.history}>
      {header && <div className={s.history_header}>{header}</div>}
      <div className={s.history_content}>
        {histList.map((i, idx) => (
          <div className={s.history_item} key={`history_item_${idx}`}>
            <div className={s.history_item_game}>
              <SvgIcon icon={i.game} classes={s.history_item_icon} />
            </div>
            <div className={s.history_item_info}>
              <span className={s.history_item_info_date}>{dayjs(i.date).format('DD-MM-YYYY в HH:mm')}</span>
              <span className={cn(stylesEvent, balance && i.amount[0] === '-' && s.history_item_info_event_gray)}>
                {i.amount ? i.amount : i.promo}
                {balance && <SvgIcon classes={s.history_item_info_icon} icon="gem" />}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

HistoryList.defaultProps = {
  header: '',
  balance: false,
  histList: [],
  text: false,
}

export default HistoryList
