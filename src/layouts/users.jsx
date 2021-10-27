import React from 'react'
import { useParams } from 'react-router'
import EditDataUser from '../components/page/editDataUser'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'

const Users = () => {
  const { userId, edit } = useParams()

  return (
    <>
      {userId ? (
        edit ? (
          <EditDataUser />
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </>
  )
}

export default Users
