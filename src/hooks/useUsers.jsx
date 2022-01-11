import React, { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import userService from '../services/user.service'
import Loader from '../components/ui/loader/loader'

const UserContext = React.createContext()

export const useUser = () => {
  return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      })
      setError(null)
    }
  }, [error])

  function getUserById(userId) {
    return users.find((u) => u._id === userId)
  }

  async function getUsers() {
    try {
      const { content } = await userService.get()
      console.log('useUsers content', content)
      setUsers(content)
      setLoading(false)
    } catch (error) {
      // console.log('useUsers catch', error)
      errorCatcher(error)
    }
  }

  function errorCatcher(error) {
    console.log('useUsers error', error)
    const { message } = error.response.data
    setError(message)
    setLoading(false)
  }

  return (
    <UserContext.Provider value={{ users, getUserById }}>
      {!isLoading ? children : <Loader />}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default UserProvider
