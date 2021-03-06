import React, { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'
import { nanoid } from 'nanoid'
import commentService from '../services/comment.service'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../store/users'

const CommenstContext = React.createContext()

export const useComments = () => {
  return useContext(CommenstContext)
}

export const CommentsProvider = ({ children }) => {
  const { userId } = useParams()
  const currentUserId = useSelector(getCurrentUserId())
  const [isLoading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getComments()
  }, [userId])

  async function createComment(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUserId
    }
    try {
      const { content } = await commentService.createComment(comment)
      setComments((prevState) => [...prevState, content])
    } catch (error) {
      errorCatcher(error)
    }
  }

  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId)
      setComments(content)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setLoading(false)
    }
  }

  async function removeComment(id) {
    try {
      const { content } = await commentService.removeComment(id)
      // Если из базы успешно удалился комметнарий
      if (content === null) {
        setComments((prevState) => prevState.filter((c) => c._id !== id))
      }
    } catch (error) {
      errorCatcher(error)
    }
  }

  function errorCatcher(error) {
    // console.log('e', error)
    const { message } = error.response.data.error
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
    <CommenstContext.Provider
      value={{ comments, createComment, removeComment, isLoading }}
    >
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
