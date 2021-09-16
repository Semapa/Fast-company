import React from 'react'
import PropTypes from 'prop-types'

const Quality = ({ color, name }) => {
  const classes = 'badge m-1 bg-'
  return <span className={classes + color}>{name}</span>
}

Quality.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default Quality
