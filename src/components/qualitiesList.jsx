import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((q) => (
        <Quality key={q._id} {...q} />
      ))}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList
