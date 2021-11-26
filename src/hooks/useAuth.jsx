import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import axios from 'axios'
import userService from '../services/user.service'

const httpAuth = axios.create()
const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({})
  const [error, setError] = useState(null)

  function setToken({ refreshToken, idToken, expiresIn = 3600 }) {
    // Трансформируем expiresIn из секунд в миллисекунды
    // и получаем TimeStamp времени в которое токен истечет
    const expiresDate = new Date().getTime() + expiresIn * 1000
    localStorage.setItem(TOKEN_KEY, idToken)
    localStorage.setItem(REFRESH_KEY, refreshToken)
    localStorage.setItem(EXPIRES_KEY, expiresDate)
  }

  async function signUp({ email, password, ...rest }) {
    const key = 'AIzaSyANciJd9cw0FecQQnj3CV_vVU6-ENwqwDQ'
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`
    try {
      // Используем обычный axios, а не наш http.service т.к. в там много различных исключений
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      })
      console.log('useAuth data', data)
      setToken(data)
      await createUser({ _id: data.localId, email, ...rest })
    } catch (error) {
      errorCatcher(error)
    }
  }

  async function createUser(data) {
    try {
      const { content } = userService.create(data)
      setUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
    // setLoading(false)
  }

  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  return (
    <AuthContext.Provider value={{ signUp, currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AuthProvider
