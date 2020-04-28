import cn from 'classnames'
import React from 'react'
import SvgIcon from '../SvgIcon'
import copyToClipboard from '../../utils/copyToClipboard'

import s from './styles.scss'

const MiniBlockInfo = ({ title, description, icon, width, copy }) => {
  return (
    <div
      className={cn(s.miniBlock, copy && s.miniBlock_copy)}
      style={{ width }}
      onClick={() => copy && copyToClipboard(description)}
    >
      <div className={cn(s.miniBlock_info, !icon && s.miniBlock_info_full)}>
        <span className={cn(s.miniBlock_info_title, !icon && s.miniBlock_info_title_full)}>{title}</span>
        <span className={cn(s.miniBlock_info_description, !icon && s.miniBlock_info_description_full)}>
          {description}
        </span>
      </div>
      {icon && <SvgIcon icon={icon} classes={s.miniBlock_icon} />}
    </div>
  )
}

MiniBlockInfo.defaultProps = {
  title: '',
  description: '',
  icon: '',
  width: 160,
  copy: false,
}

export default MiniBlockInfo
