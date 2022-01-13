import React from 'react'
import { useQualities } from '../../../hooks/useQualities'
import PropTypes from 'prop-types'
import Quality from './quality'

const QualitiesList = ({ qualitiesList }) => {
  const { qualities } = useQualities()

  if (!qualitiesList) return <></>
  const qualitiesArray = qualities.reduce((arr, quality) => {
    qualitiesList.forEach((q) => {
      if (quality._id === q) arr.push(quality)
    })
    return arr
  }, [])

  return (
    <>
      {qualitiesArray &&
        qualitiesArray.map((qual) => <Quality key={qual._id} {...qual} />)}
    </>
  )
}

QualitiesList.propTypes = {
  qualitiesList: PropTypes.array
}

export default QualitiesList
