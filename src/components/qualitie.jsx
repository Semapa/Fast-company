import React from 'react'
import PropTypes from 'prop-types'

const Qualitie = ({ color, name }) => {
  const classes = 'badge m-1 bg-'
  return <span className={classes + color}>{name}</span>
}

Qualitie.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default Qualitie
