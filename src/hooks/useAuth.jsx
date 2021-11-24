import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  async function signUp({ email, password }) {
    const key = 'AIzaSyANciJd9cw0FecQQnj3CV_vVU6-ENwqwDQ'
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`
    // Используем обычный axios, а не наш http.service т.к. в там много различных исключений
    const { data } = await axios.post(url, {
      email,
      password,
      returnSecureToken: true
    })
    console.log('useAuth data', data)
  }
  return (
    <AuthContext.Provider value={{ signUp }}>{children}</AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AuthProvider
