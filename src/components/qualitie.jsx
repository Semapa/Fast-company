import React from 'react'

const Qualitie = ({ color, name }) => {
  let classes = 'badge m-1 bg-'
  return <span className={classes + color}>{name}</span>
}

export default Qualitie
