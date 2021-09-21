import React from 'react'
import { useParams } from 'react-router'
import NavBar from '../components/navBar'
import Users from '../components/users'
import CurrentUser from '../components/currentUser'

const LayoutUsers = () => {
  const { userId } = useParams()
  return (
    <>
      <NavBar />
      {userId ? <CurrentUser /> : <Users />}
    </>
  )
}

export default LayoutUsers
