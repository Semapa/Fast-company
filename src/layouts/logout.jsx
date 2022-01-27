import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../store/users'

const Logout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logOut())
  }, [])
  return <div>Loading ...</div>
}

export default Logout
