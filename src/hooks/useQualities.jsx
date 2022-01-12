import React, { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import qualitiesService from '../services/qualities.service'

const QualitiesContext = React.createContext()

export const useQualities = () => {
  return useContext(QualitiesContext)
}

export const QualitiesProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true)
  const [qualities, setQualities] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getQualitiesList()
  }, [])

  function errorCatcher(error) {
    // console.log('e', error)
    const { message } = error.response.data
    setError(message)
    setLoading(false)
  }

  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  async function getQualitiesList() {
    try {
      const { content } = await qualitiesService.get()
      setQualities(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <QualitiesContext.Provider
      value={{ qualities, isLoadingQualities: isLoading }}
    >
      {!isLoading && children}
    </QualitiesContext.Provider>
  )
}

QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
