import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import axios from 'axios'
import userService from '../services/user.service'
import localStorageService, {
  setTokens
} from '../services/localStorage.service'

const httpAuth = axios.create()
const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({})
  const [error, setError] = useState(null)

  async function logIn({ email, password }) {
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
      getUserData()
    } catch (error) {
      const { code, message } = error.response.data.error
      console.log(code, message)
      if (code === 400) {
        switch (message) {
          case 'INVALID PASSWORD':
            throw new Error('Email или парольк введены некорректно')
          default:
            throw new Error('Слишком много попыток входа. Попробуйте позднее')
        }
      }
    }
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  async function signUp({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`
    try {
      // Используем обычный axios, а не наш http.service т.к. в там много различных исключений
      const { data } = await httpAuth.post(url, {
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
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      })
      console.log('useAuth signIn data', data)
      setTokens(data)
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      console.log('loginForm code, message', code, message)
      if (code === 400) {
        if (message === 'EMAIL_NOT_FOUND') {
          const errorObject = {
            email: 'Пользователь с таким Email не найден'
          }
          throw errorObject
        }
      }
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data
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

  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  return (
    <AuthContext.Provider value={{ signUp, signIn, logIn, currentUser }}>
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
