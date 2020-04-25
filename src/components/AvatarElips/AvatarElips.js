import React from 'react'
import PropTypes from 'prop-types'

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

AvatarElips.propTypes = {
  avatar: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default AvatarElips
