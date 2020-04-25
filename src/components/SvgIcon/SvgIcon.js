import React from 'react'
import PropTypes from 'prop-types'

import svgIcons from '../../utils/svgIcons'

const SvgIcon = ({ icon, classes }) => {
  return <div className={classes}>{svgIcons[icon]}</div>
}

SvgIcon.defaultProps = {
  icon: '',
  classes: '',
}

SvgIcon.propTypes = {
  icon: PropTypes.string,
  classes: PropTypes.string,
}

export default SvgIcon
