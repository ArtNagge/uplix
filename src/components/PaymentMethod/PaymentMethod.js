import cn from 'classnames'
import React from 'react'

import SvgIcon from '../SvgIcon'
import s from './styles.scss'

const Paymetns = ({ info, active, onClick }) => {
  const classes = cn(s.payment_method, info.value === active && s.payment_method_active)
  const dotClasses = cn(s.payment_method_activeDot, info.value === active && s.payment_method_activeDot_active)

  return (
    <div className={classes} onClick={onClick} data-value={info.value}>
      <div className={s.payment_method_info}>
        <div className={dotClasses} />
        <span>{info.name}</span>
      </div>
      <SvgIcon icon={info.value === active ? `${info.value}Active` : info.value} classes={s.payment_method_svg} />
    </div>
  )
}

export default Paymetns
