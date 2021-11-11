import React from 'react'
import { useQualities } from '../../../hooks/useQualities'
import PropTypes from 'prop-types'
import Quality from './quality'

const QualitiesList = ({ qualities }) => {
  const { qualitiesList } = useQualities()

  const qualitiesArray = qualitiesList.reduce((arr, quality) => {
    qualities.forEach((q) => {
      if (quality._id === q) arr.push(quality)
    })
    return arr
  }, [])

  return (
    <>
      {qualitiesArray.map((qual) => (
        <Quality key={qual._id} {...qual} />
      ))}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList
