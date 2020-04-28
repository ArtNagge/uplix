import React from 'react'

import svgIcons from '../../utils/svgIcons'

const SvgIcon = ({ icon, classes }) => {
  return <div className={classes}>{svgIcons[icon]}</div>
}

SvgIcon.defaultProps = {
  icon: '',
  classes: '',
}

export default SvgIcon
