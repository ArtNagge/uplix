import React from 'react'
import cn from 'classnames'

import s from './styles.scss'

const AvatarElips = (avatar, width = 0, height = 0, tr) => {
  return (
    <div className={cn(s.avatar, tr && s.avatar_shadownone)} style={{ width, height }}>
      <div className={s.avatar_elips} style={{ width: width - (tr ? 6 : 10), height: height - (tr ? 6 : 10) }}>
        <img src={avatar} alt="" />
      </div>
    </div>
  )
}

export default AvatarElips
