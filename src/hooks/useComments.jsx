import React, { useState, useEffect, useContext } from 'react'
// import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'
import { useAuth } from './useAuth'
import { nanoid } from 'nanoid'

const CommenstContext = React.createContext()

export const useComments = () => {
  return useContext(CommenstContext)
}

export const CommentsProvider = ({ children }) => {
  const { userId } = useParams()
  const { currentUser } = useAuth()
  //   const [isLoading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
  //   const [error, setError] = useState(null)

  useEffect(() => {
    setComments(null)
  }, [])

  async function createComment(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUser._id
    }
    console.log('useComments comment', comment)
  }

  return (
    <CommenstContext.Provider value={{ comments, createComment }}>
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
