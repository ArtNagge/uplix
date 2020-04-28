import React from 'react'

import s from './styles.scss'

const AvatarElips = (avatar, width = 0, height = 0) => {
  return (
    <div className={s.avatar} style={{ width, height }}>
      <div className={s.avatar_elips} style={{ width: width - 10, height: height - 10 }}>
        <img src={avatar} alt="" />
      </div>
    </div>
  )
}

export default AvatarElips
