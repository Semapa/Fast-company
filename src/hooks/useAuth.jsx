import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// import configFile from '../config.json'
import { toast } from 'react-toastify'
import axios from 'axios'
import userService from '../services/user.service'
import localStorageService, {
  setTokens
} from '../services/localStorage.service'

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
  const [currentUser, setUser] = useState({})
  const [error, setError] = useState(null)

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
      getUserData()
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
    }
  }
  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData()
    }
  }, [])

  // TODO toast.error отображается большой внизу
  useEffect(() => {
    if (error !== null && error !== undefined) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      })
      setError(null)
    }
  }, [error])

  return (
    <AuthContext.Provider value={{ signUp, signIn, currentUser }}>
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
