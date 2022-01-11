import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

const Logout = () => {
  const { logOut } = useAuth()
  useEffect(() => {
    logOut()
  }, [])
  return <div>Loading ...</div>
}

export default Logout
