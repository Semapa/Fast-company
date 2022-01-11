import React, { useState, useEffect, useContext } from 'react'
// import { toast } from 'react-toastify'
import PropTypes from 'prop-types'

const CommenstContext = React.createContext()

export const useComments = () => {
  return useContext(CommenstContext)
}

export const CommentsProvider = ({ children }) => {
  //   const [isLoading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
  //   const [error, setError] = useState(null)

  useEffect(() => {
    setComments(null)
  }, [])

  return (
    <CommenstContext.Provider value={{ comments }}>
      {children}
    </CommenstContext.Provider>
  )
}

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
