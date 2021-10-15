import React from 'react'
import PropTypes from 'prop-types'

const Avatar = ({ classes, width = '65', height = '65' }) => {
  return (
    <img
      src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
        .toString(36)
        .substring(7)}.svg`}
      className={classes}
      width={width}
      height={height}
      alt="avatar"
    />
  )
}

Avatar.propTypes = {
  classes: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string
}
export default Avatar
