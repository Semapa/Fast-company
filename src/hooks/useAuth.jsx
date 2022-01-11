import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// import configFile from '../config.json'
import { toast } from 'react-toastify'
import axios from 'axios'
import userService from '../services/user.service'
import localStorageService, {
  setTokens
} from '../services/localStorage.service'
import { useHistory } from 'react-router-dom'

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
})
const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState()
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const history = useHistory()

  function logOut() {
    localStorageService.removeAuthData()
    setUser(null)
    history.push('/')
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  async function signUp({ email, password, ...rest }) {
    try {
      // Используем обычный axios, а не наш http.service т.к. в там много различных исключений
      const { data } = await httpAuth.post(`accounts:signUp`, {
        email,
        password,
        returnSecureToken: true
      })
      console.log('useAuth data', data)
      setTokens(data)

      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        ...rest
      })
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = {
            email: 'Пользователь с таким Email уже существует'
          }
          throw errorObject
        }
      }
    }
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data)
      setUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  async function signIn({ email, password }) {
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true
      })
      console.log('useAuth signIn data', data)
      setTokens(data)
      await getUserData()
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      console.log('loginForm code, message', code, message)
      if (code === 400) {
        switch (message) {
          case 'INVALID PASSWORD':
            throw new Error('Email или парольк введены некорректно')
          case 'EMAIL_NOT_FOUND':
            throw new Error('Пользователь с таким Email не найден')
          default:
            throw new Error('Слишком много попыток входа. Попробуйте позднее')
        }
      }
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data.error
    setError(message)
    // setLoading(false)
  }

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser()
      setUser(content)
    } catch (error) {
      errorCatcher(error)
    } finally {
      // После загрузки пользователя убираем лоадер
      setLoading(false)
    }
  }
  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData()
    } else {
      // Отображем для неавторизованного пользователя
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (error !== null && error !== undefined) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      })
      setError(null)
    }
  }, [error])

  return (
    <AuthContext.Provider value={{ signUp, logOut, signIn, currentUser }}>
      {!isLoading ? children : 'Loading...'}
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
