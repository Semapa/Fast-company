import React, { useEffect } from 'react'
// import { useQualities } from '../../../hooks/useQualities'
import PropTypes from 'prop-types'
import Quality from './quality'
import { useSelector, useDispatch } from 'react-redux'
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus,
  loadQualitiesList
} from '../../../store/qualities'

const QualitiesList = ({ qualitiesList }) => {
  // const { qualities } = useQualities()
  const dispatch = useDispatch()
  const qualitiesArray = useSelector(getQualitiesByIds(qualitiesList))
  const isLoading = useSelector(getQualitiesLoadingStatus())

  // Чтобы при монтирование обновлялось состояние qualities
  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])

  if (isLoading) return 'Loading ...'

  // Старый вариант
  // const qualitiesArray = qualities.reduce((arr, quality) => {
  //   qualitiesList.forEach((q) => {
  //     if (quality._id === q) arr.push(quality)
  //   })
  //   return arr
  // }, [])

  return (
    <>
      {qualitiesArray.map((qual) => (
        <Quality key={qual._id} {...qual} />
      ))}
    </>
  )
}

QualitiesList.propTypes = {
  qualitiesList: PropTypes.array
}

export default QualitiesList
