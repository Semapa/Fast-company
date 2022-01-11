import React, { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'
import { useAuth } from './useAuth'
import { nanoid } from 'nanoid'
import commentService from '../services/comment.service'

const CommenstContext = React.createContext()

export const useComments = () => {
  return useContext(CommenstContext)
}

export const CommentsProvider = ({ children }) => {
  const { userId } = useParams()
  const { currentUser } = useAuth()
  const [isLoading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    setComments(null)
    setLoading(false)
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
    try {
      const { content } = await commentService.createComment(comment)
      console.log('useComments content', content)
    } catch (error) {
      errorCatcher(error)
    }
  }

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
  return (
    <CommenstContext.Provider value={{ comments, createComment, isLoading }}>
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
